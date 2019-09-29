import React from 'react';
import {authorize} from 'react-native-app-auth';
import LottieView from 'lottie-react-native';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {Button} from '../components/Button.js';
import {State, withState} from '../services/state.js';
import {githubConfig} from '../services/github.js';

@withState
export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  navigateToSearchScreen = () => {
    this.props.navigation.navigate('Search');
  };

  async getRepo(token) {
    try {
      const res = await (await fetch(
        `https://api.github.com/user/repos?access_token=${token}`,
      )).json();
      State.repos.push(res);
    } catch (error) {
      alert('We could not get your repositories!');
    }
  }

  githubLoginPress = async () => {
    const authState = await authorize(githubConfig);
    if (authState && authState.accessToken) {
      State.github = authState;
      this.getRepo(authState.accessToken);
      this.forceUpdate();
    }
  };

  render() {
    const {github} = this.props.appState;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <LottieView
            source={require('../animations/github.json')}
            autoPlay
            loop
          />
        </View>
        <Button
          label="Search repositories"
          onPress={this.navigateToSearchScreen}
        />
        {github ? (
          <Text style={{textAlign: 'center', marginHorizontal: 50}}>
            Pisst! You will see your repositories with a green border now!
          </Text>
        ) : (
          <Button
            theme="dark"
            label="Login with github"
            onPress={this.githubLoginPress}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  logoContainer: {
    width: 300,
    height: 300,
  },
});
