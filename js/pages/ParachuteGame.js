import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, 
  StatusBar, TouchableHighlight,  NativeEventEmitter,
  DeviceEventEmitter} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

var ParachuteARScene = require('../arScenes/ParachuteScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
}

export default class ParachuteGame extends Component {
  
  constructor() {
      super();

    this.state = {
      sharedProps : sharedProps
    }
  }

   

  render() {

  return (
      <View style={localStyles.viroContainer} transparent={true} >
      <StatusBar hidden={true} />


        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: ParachuteARScene}}
         worldAlignment="GravityAndHeading"  
         style={localStyles.viroContainer} />

         {this._renderHUD()}
      </View>
    );
  }

  _renderHUD() {
    return(
    <TouchableHighlight underlayColor="transparent">
      <View style={localStyles.bottomHud}>
       <Image source={require('../../public/images/CryptoCreditWave.png')}
        style={localStyles.wave}/>
        <Image source={require('../../public/images/CryptoClash-App-Icon-Android.png')}
        style={localStyles.cryptoLogo}/>
        <Text style={localStyles.score}> 0 </Text>
      </View>
    </TouchableHighlight>)
  }


  _startVideoRecording() {
   // this.props.sceneNavigator.startVideoRecording("testVideo", true, function(e) {console.log(e)});
  }

  _stopVideoRecording() {
    // this.props.sceneNavigator.stopVideoRecording();
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1
  },
  mainView : {
    alignItems:'center', 
    backgroundColor:'transparent'
  },
  ARDLogo : {
    width: 300, 
    height: 50, 
    backgroundColor:"transparent"
  },
  backButton : {
    position:'absolute',
    top:5, 
    left:5, 
    width:50, 
    height:50
  },
  cameraButton : {
    position:'absolute',
    top:5,
    right:5,
    width:50, 
    height:50
  },
  bottomText : {
    fontSize:25, 
    color:'#fff', 
    textAlign:'center', 
    marginTop:12, 
    height:60, 
    flex:1
  },
  smallIcon : {
    width:50,
    height:50
  },
  bottomHud: {
    height:150
  },
  wave : {
   width:'100%',
   height:150
  },
  cryptoLogo : {
    position: 'absolute',
    width: 80,
    height: 80,
    right:30,
    top:15
  },
  score : {
    position: 'absolute',
    right: 48,
    top: 95,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffa028'
  }
});