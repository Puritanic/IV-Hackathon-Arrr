import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HelloWorldSceneAR from '../screens/HelloWorldSceneAR';
import Home from '../screens/Home';

const AppStack = createBottomTabNavigator({
	Markers: createStackNavigator({
		Home: Home,
		ARScreen: HelloWorldSceneAR,
	}),
});

export default createAppContainer(
	createSwitchNavigator(
		{
			App: AppStack,
		},
		{
			initialRouteName: 'App',
		}
	)
);
