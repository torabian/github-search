import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {SearchScreen} from './src/screens/SearchScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Search: {
    screen: SearchScreen,
  },
});

export default createAppContainer(AppNavigator);
