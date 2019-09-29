import React from 'react';
import {TouchableOpacity, Linking, View, Text} from 'react-native';
import moment from 'moment';
import {styles} from './Repository.styles';
import {Star} from './Star';

export class Repository extends React.Component {
  static defaultProps = {
    onPress: () => {},
    isUserRepo: false,
  };

  openUrl = () => {
    const url = this.props.item.html_url;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  render() {
    const repo = this.props.item;
    const {isUserRepo} = this.props;

    return (
      <View
        style={[styles.container, isUserRepo ? styles.userRepo : null]}
        onPress={this.props.onPress}>
        <View style={styles.header}>
          <Text style={styles.repoOwner}>{repo.owner.login}</Text>
          <Text style={styles.dashBetween}>/</Text>
          <TouchableOpacity onPress={this.openUrl}>
            <Text style={styles.repoName}>{repo.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.starContainer}>
            <Star count={repo.stargazers_count} />
            <Text style={styles.repoId}>ID: {repo.id}</Text>
          </View>
          <Text style={styles.repoDescription}>{repo.description}</Text>
          <Text style={styles.repoDate}>
            {moment(repo.created_at).format('YYYY/MM/DD')}
          </Text>
        </View>
      </View>
    );
  }
}
