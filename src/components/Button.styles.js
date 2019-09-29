import {StyleSheet} from 'react-native';
import {PrimaryColor, WhiteColor, BlackColor} from '../theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 30,
    borderColor: PrimaryColor,
    backgroundColor: PrimaryColor,
    borderRadius: 3,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    color: WhiteColor,
  },
  dark: {
    color: WhiteColor,
    backgroundColor: BlackColor,
    borderColor: BlackColor,
  },
});
