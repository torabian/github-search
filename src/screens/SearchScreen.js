import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Picker,
} from 'react-native';
import {toJS} from 'mobx';
import {
  Searchbar,
  ActivityIndicator,
  Colors,
  Button,
  Dialog,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';

import {Repository} from '../components/Repository';
import {debounce} from 'lodash';
import {withState} from '../services/state';
import {queryGithub} from '../services/github';

@withState
export class SearchScreen extends React.Component {
  state = {
    result: [],
    page: 1,
    loading: false,
    keyword: '',
    visible: false,
    itemsPerPage: 5,
  };

  constructor(props) {
    super(props);
    this.refreshQuery = debounce(this.refreshQuery, 400);
    this.onEndReachedCalledDuringMomentum = true;
  }

  async getData() {
    const data = {
      page: this.state.page,
      q: this.state.keyword,
      itemsPerPage: this.state.itemsPerPage,
    };
    if (!data.q) {
      return this.setState({
        loading: false,
      });
    }
    const response = await queryGithub(data);
    if (response.message) {
      this.setState({
        loading: false,
      });
      return alert(response.message);
    }
    if (!response.items) {
      return this.setState({
        response,
        loading: false,
      });
    }
    this.setState({
      loading: false,
      result: this.state.result.concat(response.items),
    });
  }

  componentDidMount() {
    this.getData();
  }

  filtersToggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  renderItem = ({item}) => {
    const isUserRepo = this.repos.find(
      repo => repo.full_name === item.full_name,
    );
    return (
      <Repository isUserRepo={isUserRepo} key={item.node_id} item={item} />
    );
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getData();
        },
      );
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  refreshQuery = () => {
    this.setState({result: [], loading: true});
    this.getData();
  };

  onChangeText = query => {
    this.setState({keyword: query, page: 1}, () => {
      this.refreshQuery();
    });
  };

  content = () => {
    const {result, loading} = this.state;

    if (loading) {
      return (
        <View style={{marginTop: 30}}>
          <ActivityIndicator animating={true} color={Colors.red800} />
        </View>
      );
    }

    if (result.length) {
      return (
        <FlatList
          data={result}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem}
          keyExtractor={item => item && item.full_name}
          style={styles.flatList}
        />
      );
    }
    if (!this.state.keyword) {
      return (
        <Text style={styles.noResult}>
          Welcome! Search something on the search bar to get the results
        </Text>
      );
    }
    return (
      <Text style={styles.noResult}>
        There are no results for this search. You can try to type, for example,
        Angular.
      </Text>
    );
  };

  get repos() {
    return toJS(this.props.appState.repos)[0] || [];
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeText}
          value={this.state.keyword}
        />
        <Button icon="settings" onPress={this.filtersToggle}>
          Filters
        </Button>

        {this.content()}

        <PaperProvider>{this.dialog()}</PaperProvider>
      </SafeAreaView>
    );
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  dialog() {
    return (
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
          <Dialog.Title>Filters</Dialog.Title>
          <Dialog.Content>
            <Text>Items per search?</Text>
            <Picker
              selectedValue={this.state.itemsPerPage}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({itemsPerPage: itemValue})
              }>
              <Picker.Item label="5" value="5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="15" value="15" />
            </Picker>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: 300,
    height: 300,
  },
  flatList: {
    paddingHorizontal: 10,
  },
  noResult: {
    margin: 20,
  },
});
