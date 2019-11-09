import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const screens = {
  Home: {
    screen: HomeScreen
  },
  Map: {
    screen: MapScreen
  }
}

const config = {
  headerMode: 'none',
  initialRouteName: 'Home'
}

const MainNavigator = createStackNavigator(screens,config);
export default createAppContainer(MainNavigator);