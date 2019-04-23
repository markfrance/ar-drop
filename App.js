import React, { Component, View } from 'react';

//import SplashScreen from './js/pages/SplashScreen.js';
import HowToFirstScreen from './js/pages/HowToFirstScreen.js';
import AirdropListScreen from './js/pages/AirdropList.js'; 
import HowToRedropScreen from './js/pages/HowToRedropScreen.js';
import ARViewScreen from './js/pages/ARViewScreen.js';
import MapViewScreen from './js/pages/MapViewScreen.js';
import ARMapTiltScreen from './js/pages/ARMapTiltScreen.js';
//import PortalGame from './js/pages/PortalGame.js';
import ParachuteGame from './js/pages/ParachuteGame.js';
import WalletScreen from './js/pages/Wallet.js';

import { createStackNavigator, 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator } from 'react-navigation'; 

const TabNavigator = createMaterialTopTabNavigator({
  AirdropScreen: {
    screen: AirdropListScreen,
    navigationOptions: {title: "CLASHES"}
  },
  WalletScreen: {
    screen: WalletScreen,
    navigationOptions: {title: "WALLET"}
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#3b3b3b',
    inactiveBackgroundColor: '#ffffff',
    activeTintColor: '#ffa028',
    inactiveTintColor: '#f86e00',

  labelStyle: {
    fontSize: 14,
  },
  style: {
    backgroundColor: '#fff'
  }
}}
);

const RootStack = createSwitchNavigator(
  {
    // Splash: SplashScreen,
    HowToSplash: HowToFirstScreen,
    Airdrop: TabNavigator,
    HowToRedrop: HowToRedropScreen,
    ARView: ARViewScreen,
    Tilt: ARMapTiltScreen,
    MapView: MapViewScreen,
   // Portal: PortalGame,
    Parachute: ParachuteGame
  },
  {
    initialRouteName: 'HowToSplash'
  }
);


const AppNavigator = createSwitchNavigator({
  Main: RootStack,
  AirdropWallet: TabNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
     return <AppContainer />;
  }

}

module.exports = App;
