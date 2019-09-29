import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Star extends React.Component {
  static defaultProps = {
    onPress: () => {},
  };

  render() {
    return (
      <View style={{alignSelf: 'flex-start'}}>
        <Icon.Button
          name="star"
          backgroundColor="#eff3f6"
          style={{paddingHorizontal: 15}}
          color="#24292e"
          onPress={this.props.onPress}>
          <Text>{this.props.count}</Text>
        </Icon.Button>
      </View>
    );
  }
}
