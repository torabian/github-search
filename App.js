import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {SearchScreen} from './src/screens/SearchScreen';

const AppNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
  Home: {
    screen: HomeScreen,
  },
});

export default createAppContainer(AppNavigator);
