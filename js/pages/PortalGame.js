import React, { Component } from 'react';
import {
  View, 
  Alert,
  Image, 
  Text, 
  StyleSheet, 
  TouchableHighlight,  
  NativeEventEmitter,
  DeviceEventEmitter
} from 'react-native';

import FireworkEmitter from '../FireworkEmitter.js';
import { ViroARSceneNavigator } from 'react-viro';

var InitialARScene = require('../arScenes/PortalScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
}

export default class PortalGame extends Component {
  
  constructor(props) {
      super(props);

    this.state = {
      isRecording: false,
      remainingCoins: 10,
      enableThermal: false,
      sharedProps : sharedProps,
    }

    this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
    this._displayAlert = this._displayAlert.bind(this);
    this._updateStatusText = this._updateStatusText.bind(this);
    this._collectCoin = this._collectCoin.bind(this);
    this._getStatusText = this._getStatusText.bind(this);
  }

  _setARNavigatorRef(ARNavigator){
    this._arNavigator = ARNavigator;
  }

  _updateStatusText(text) {
    this.setState({
      statusText: text
    });
  }

  _collectCoin() {
    this.setState({
      remainingCoins: this.state.remainingCoins--
    })
  }

  _getStatusText() {
    if(this.state.remainingCoins === 0)
      return "WINNER";
    else
      return this.state.remainingCoins + "Remaining";
  }
  
  render() {

    return (
      <View style={localStyles.viroContainer} transparent={true} >
        
        <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>
         
        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} 
        ref={this._setARNavigatorRef} 
        viroAppProps={{enableThermal: this.state.enableThermal,
          collectCoin: this._collectCoin}}
         worldAlignment="GravityAndHeading"  />
       
        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
         
          <TouchableHighlight onPress={() => this.props.navigation.navigate("Airdrop")}
            style={localStyles.backButton} >
            <Image source={require("../../public/images/ar_d_back_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          <Text style={localStyles.bottomText}> {this._getStatusText()}</Text>
          <TouchableHighlight onPress={() => this.setState({
            enableThermal: !this.state.enableThermal
          })}
            style={localStyles.cameraButton} >
            <Image source={require("../../public/images/ar_d_camera_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          
        </View>
      </View>
    );
  }


  _displayAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => this.props.navigation.navigate("Portal")},
    ],
    { cancelable: false }
  )
}

  _toggleVideoRecording() {
  
    if(this.state.isRecording) {
      this._arNavigator.sceneNavigator.stopVideoRecording();
    } else {
      this._arNavigator.sceneNavigator.startVideoRecording(
      "testVideo", true, function(e) {
        this._displayAlert("Set video permissions", e);
      });
    }

    this.setState({
      isRecording: !this.state.isRecording
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor:"transparent"
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
  }
});