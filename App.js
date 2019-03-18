import React, { Component } from 'react';

//import SplashScreen from './js/pages/SplashScreen.js';
import HowToFirstScreen from './js/pages/HowToFirstScreen.js';
import AirdropListScreen from './js/pages/AirdropList.js'; 
import HowToRedropScreen from './js/pages/HowToRedropScreen.js';
import ARViewScreen from './js/pages/ARViewScreen.js';
import MapViewScreen from './js/pages/MapViewScreen.js';
import ARMapTiltScreen from './js/pages/ARMapTiltScreen.js';

import { createStackNavigator, createAppContainer } from 'react-navigation'; 

const RootStack = createStackNavigator(
  {
   // Splash: SplashScreen,
    HowToSplash: HowToFirstScreen,
     Airdrop: AirdropListScreen,
    HowToRedrop: HowToRedropScreen,
    ARView: ARViewScreen,
    Tilt: ARMapTiltScreen,
    MapView: MapViewScreen
  },
  {
    initialRouteName: 'MapView'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
     return <AppContainer />;
  }

}

module.exports = App;
