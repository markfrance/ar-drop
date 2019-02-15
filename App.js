import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  PixelRatio,
  FlatList, 
  ActivityIndicator,
  Modal
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import { List, ListItem } from "react-native-elements";
import Swiper from 'react-native-swiper';

import SplashScreen from './js/pages/SplashScreen.js';
import HowToFirstScreen from './js/pages/HowToFirstScreen.js';
import AirdropListScreen from './js/pages/AirdropList.js';
import HowToRedropScreen from './js/pages/HowToRedropScreen.js';
import ARViewScreen from './js/pages/ARViewScreen.js';
import MapViewScreen from './js/pages/MapViewScreen.js';

import { createStackNavigator, createAppContainer } from 'react-navigation'; 

const RootStack = createStackNavigator(
  {
    Splash: SplashScreen,
    HowToSplash: HowToFirstScreen,
    Airdrop: AirdropListScreen,
    HowToRedrop: HowToRedropScreen,
    ARView: ARViewScreen,
    MapView: MapViewScreen 
  },
  {
    initialRouteName: 'Splash'
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
