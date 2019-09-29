import {StyleSheet} from 'react-native';
import {LinkColor, BorderColor, BackgroundColor, ActiveColor} from '../theme';
const fontSize = 16;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BorderColor,
  },
  repoName: {
    fontSize,
    fontWeight: 'bold',
    color: LinkColor,
  },
  repoDescription: {
    marginTop: 10,
  },
  userRepo: {borderColor: ActiveColor},
  header: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: BackgroundColor,
  },
  repoOwner: {
    fontSize,
  },
  dashBetween: {
    fontSize,
    marginHorizontal: 5,
    color: LinkColor,
  },
  content: {
    padding: 15,
  },
  repoDate: {
    marginTop: 10,
    color: 'blue',
  },
  repoId: {
    fontSize: 12,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
