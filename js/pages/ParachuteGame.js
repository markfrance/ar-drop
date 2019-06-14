import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, 
  StatusBar, TouchableHighlight,  NativeEventEmitter,
  DeviceEventEmitter} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';
import {Timer, Stopwatch } from 'react-native-stopwatch-timer';

var ParachuteARScene = require('../arScenes/ParachuteScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
}

export default class ParachuteGame extends Component {
  
  constructor() {
      super();

    this.state = {
      sharedProps : sharedProps,
      score: 0,
      stopwatchStart: false,
      stopwatchReset: false
    }

    this._msToTime = this._msToTime.bind(this);
    this._updateScore = this._updateScore.bind(this);
    this._startStopwatch = this._startStopwatch.bind(this);
    this._stopStopwatch = this._stopStopwatch.bind(this);
    this._resetStopwatch = this._resetStopwatch.bind(this);
   
  }

  componentDidMount() {
    this._startStopwatch();
  }

  componentDidUpdate() {
    if(this.state.score == 9) {
      this._stopStopwatch();
      setTimeout(() => this.props.navigation.navigate('Airdrop'),
        2000);
    }
  }
  
  _msToTime(duration) {
    var time = new Date(duration);
    return time.getMinutes() + ':' +
      time.getSeconds() + ':' +
      time.getMilliseconds();
  }

  _updateScore(value){
    if(this.state.score + value <= 0) {
      this.setState({score: 0});
    } else {

    this.setState({score: this.state.score + value});
    }

  }

  _startStopwatch() {
    this.setState({stopwatchStart: true, stopwatchReset: false});
  }

  _stopStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: false});
  }

  _resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  render() {

  return (
      <View style={localStyles.viroContainer} transparent={true} >
      <StatusBar hidden={true} />

        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: ParachuteARScene}}
         worldAlignment="GravityAndHeading"  
         style={localStyles.viroContainer} 
         viroAppProps={{updateScore:this._updateScore}}/>

         {this._renderHUD()}
      </View>
    );
  }

  _renderHUD() {
    return(
      <View style={localStyles.bottomHud}>
      <Stopwatch laps msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this._msToTime} />
       <Image source={require('../../public/images/CryptoClash-Wave.png')}
        style={localStyles.wave}/>
        <Image source={require('../../public/images/CryptoClash-App-Icon-Android.png')}
        style={localStyles.cryptoLogo}/>
        <Text style={localStyles.score}> {this.state.score} </Text>
      </View>)
  }


  _startVideoRecording() {
   // this.props.sceneNavigator.startVideoRecording("testVideo", true, function(e) {console.log(e)});
  }

  _stopVideoRecording() {
    // this.props.sceneNavigator.stopVideoRecording();
  }
}


const options = {
  container: {
    position: 'absolute',
    top: 10,
    padding: 5,
    width: 240,
  },
  text: {
    fontSize: 36,
    color: '#ffa028'
  }
};

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
    backgroundColor:'black',
    height:150
  },
  wave : {
   backgroundColor:'transparent',
   flex:1,
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
  },
  timer: {
    position: 'absolute',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffa028',
    top: 10,
    left: 10
  }
});