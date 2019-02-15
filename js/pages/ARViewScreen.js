import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

var InitialARScene = require('../ARScene');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4"
}

export default class ARViewScreen extends Component {
	
	constructor() {
    	super();

    this.state = {
      sharedProps : sharedProps,
    }
  	}

	render() {
	return (
      <View style={localStyles.viroContainer} transparent={true} >
        
        <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>

        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}}  />

        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
          <Text style={localStyles.bottomText}>{"CLICK TO GRAB!"}</Text>
       
          <TouchableHighlight onPress={this.props.navigation.navigate('Airdrop')}
            style={localStyles.backButton} >
          <Image source={require("../../public/images/ar_d_back_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          <TouchableHighlight onPress={tthis.props.navigation.navigate('Airdrop')}
            style={localStyles.cameraButton} >
          <Image source={require("../../public/images/ar_d_camera_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          
           </View>
      </View>
    );
	}

  _startVideoRecording() {
    this.props.sceneNavigator.startVideoRecording("testVideo", true, function(e) {console.log(e)});
  }

  _stopVideoRecording() {
     this.props.sceneNavigator.stopVideoRecording();
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
  	top:0, 
  	left:0, 
  	width:50, 
  	height:50
  },
  cameraButton : {
  	position:'absolute',
  	top:0,
  	right:0,
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