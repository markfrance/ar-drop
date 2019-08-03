import React, { Component } from 'react';
import {View, 
  Image, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableHighlight,  
  Animated,
  NativeEventEmitter,
  DeviceEventEmitter} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import {Timer, Stopwatch } from 'react-native-stopwatch-timer';

import { BezierCurve } from './components/BezierCurve';

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
    let hasEnded = false
    if(this.state.score == 9 && !hasEnded) {
      hasEnded = true;
      this._stopStopwatch();
      setTimeout(() => this.props.navigation.navigate('Leaderboard'),
        2000);
    }
  }
  
  _msToTime(duration) {
    var time = new Date(duration);
    return time.getMinutes() + ':' +
      time.getSeconds() + ':' +
      time.getMilliseconds().toFixed(2);
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
         style={localStyles.viroContainer} 
         viroAppProps={{updateScore:this._updateScore}}/>

         {this._renderHUD()}
      </View>
    );
  }

  _renderHUD() {
    return(
      <View style={localStyles.bottomHud}>
      <Stopwatch msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this._msToTime} />
       <BezierCurve scrollAmount={new Animated.Value(0)} />
        
        <Image source={require('../../public/images/CryptoClash-App-Icon-Android.png')}
        style={localStyles.cryptoLogo}/>
        <Text style={localStyles.score}> {this.state.score} </Text>
        <TouchableHighlight style={{flex:1}}
            onPress={() => this.props.navigation.navigate('DemoMode')}
            >
        <Image source={require('../../public/images/CryptoClash-Back-Arrow.png')}
        style={localStyles.backButton}/>
        </TouchableHighlight>
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
    top: -155,
    padding: 5,
    width: 240,
  },
  text: {
    fontSize: 36,
    color: '#ffa028',
    textShadowColor: 'black',
    textShadowOffset:{width: 2, height:2},
    textShadowRadius: 1
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
    top:-50, 
    left:10, 
    width:30, 
    height:30,
    opacity:0.5,
    zIndex:-1
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
    backgroundColor:'transparent',
    height:0,
    opacity:0.8
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
    top:-135
  },
  score : {
    position: 'absolute',
    right: 48,
    top: -55,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffa028',
    textShadowColor: 'black',
    textShadowOffset:{width: 2, height:2},
    textShadowRadius: 1
  },
});