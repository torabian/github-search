import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './Button.styles';

export class Button extends React.Component {
  static defaultProps = {
    onPress: () => {},
  };

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          this.props.theme ? styles[this.props.theme] : null,
        ]}
        onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}
