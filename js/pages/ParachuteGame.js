import React, { Component } from 'react';

import {
  View, 
  Image, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableHighlight,  
  TouchableOpacity,
  Dimensions,
  Animated } from 'react-native';

import moment from 'moment';

import {
  ViroARSceneNavigator,
  ViroConstants} from 'react-viro';

import { BezierCurve } from './components/BezierCurve';

import Svg, { Path } from 'react-native-svg';

var ParachuteARScene = require('../arScenes/ParachuteScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
}

export default class ParachuteGame extends Component {
  
  constructor(props) {
      super(props);

    this.state = {
      sharedProps : sharedProps,
      score: 0,
      maxScore: 100,
      start:0,
      mode:props.navigation.state.params.mode,
      crypto:props.navigation.state.params.crypto,
      hasEnded: false,
      hasStarted: false
    }

    this._updateScore = this._updateScore.bind(this);
    this._startStopwatch = this._startStopwatch.bind(this);
    this._stopStopwatch = this._stopStopwatch.bind(this);
    this._parachuteInfo = this._parachuteInfo.bind(this);
    this._renderParachuteData = this._renderParachuteData.bind(this);
    this._renderTimer = this._renderTimer.bind(this);
  }

  componentDidUpdate() {
    if(this.state.score >= this.state.maxScore 
      && !this.state.hasEnded) {

      this._stopStopwatch();

      const endTime = this.state.now - this.state.start;
      setTimeout(() => this.props.navigation.navigate('DemoLeaderboard',
        {mode:this.state.mode, crypto:this.state.crypto,
          time: endTime}),
        2000);
      this.setState({hasEnded:true});
    }
  }

  componentWillUnmount() {
    this._stopStopwatch();
  }

  _updateScore(value){
    if(this.state.score + value <= 0) {
      this.setState({score: 0});
    } else {

    this.setState({score: this.state.score + value});
    }

  }

  _renderTimer() {

    if(!this.state.hasStarted){
      return null;
    }

    const time = this.state.now - this.state.start;
    const pad = (n) => n >= 10 ? n : '0' + n;

    const duration = moment.duration(time);
    const centiseconds = Math.floor(duration.milliseconds() / 10);

    return(
      <Text style={localStyles.timerText}>
      {pad(duration.minutes())}:{pad(duration.seconds())}:{pad(centiseconds)}
      
      </Text>
      );
  }

  _startStopwatch() {
    const now = new Date().getTime();

    this.setState({
      start: now,
      hasStarted: true
    });

    this.timer = setInterval(() => 
      this.setState({
        now: new Date().getTime()
      }), 100);
  }

  _stopStopwatch() {
    clearInterval(this.timer);
  }
 
  _parachuteInfo(parachutes) {
    this.setState({
      parachuteData: parachutes
    })
  }

  _getCryptoLogo() {
    if(this.state.crypto === "BTC"){
      return require('../../public/images/BitcoinLogo.png')
    }
    if(this.state.crypto === "ETH") {
      return require('../../public/images/ETHLogo.png')
    }
    else {
      return require('../../public/images/Icons/android/Icon-96.png')
    }
  }

  render() {

    return (
      <View style={localStyles.viroContainer} transparent={true} >
        <StatusBar hidden={true} />

        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: ParachuteARScene}}
         style={localStyles.viroContainer} 
         viroAppProps={{updateScore:this._updateScore,
          stopwatchStart:this._startStopwatch,
          crypto:this.state.crypto,
          mode:this.state.mode
          }}/>

          
      {this._renderHUD()}
      

      </View>
      );
  }
  
  _renderParachuteData() {
    if(this.state.parachuteData) 
      return(this.state.parachuteData[0]);
  }

  _renderHUD() {
    return(
      <View style={localStyles.bottomHud}>
      
        {this._renderTimer()}
        <View style={localStyles.wave}>
        <Svg
        width={Dimensions.get('window').width}
        height={160}

        viewBox="0 0 825 300"
      >
        <Path
          d="M0 181.615c3.252.4 6.48.974 9.67 1.72 43.07 12.29 86 25.23 129.2 36.86 30.4 8.17 61.16 15.17 92 21.59 21.54 4.49 43.4 7.75 65.25 10.36a546.99 546.99 0 0 0 57 3.92c26.83.36 50.57-8 70.64-26.92 16.1-15.19 29.17-32.62 41.72-50.54 17.91-25.56 34.87-51.8 53.31-77 13.39-18.28 27-36.49 44.42-51.53 25.67-22.08 54.66-37.19 87.67-44.89a195.85 195.85 0 0 1 58.39-4.71c35 2.44 67.68 12.82 97 32.56 6.17 4.15 11.84 9 17.74 13.58v262H0v-127z"
          fill="#ffffff"
        />
        <Path d="M0 308h824v1200H0V308z" fill="#ffffff" />
      </Svg>
      </View>

        <Image source={this._getCryptoLogo()}
        style={localStyles.cryptoLogo}/>
        <Text style={localStyles.score}> {this.state.score} / {this.state.maxScore} </Text>
        
        <TouchableOpacity style={{flex:1}}
            onPress={() => this.props.navigation.navigate('DemoMode')}
            >
          <Image source={require('../../public/images/CryptoClash-Back-Arrow.png')}
          style={localStyles.backButton}/>
        </TouchableOpacity>
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
  smallIcon : {
    width:50,
    height:50
  },
  bottomHud: {
    backgroundColor:'transparent',
    height:0,
    opacity:0.8
  },
  wave: {
    backgroundColor:'transparent',
    position:'absolute',
    top:-160,
    width:200
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
    right: 10,
    top: -55,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffa028',
    textShadowColor: 'black',
    textShadowOffset:{width: 2, height:2},
    textShadowRadius: 1
  },
  debugText:{
    position:'absolute',
    top:-220,
    color:'white'
  },
  loadingScreen: {
    textAlign:'center',
    backgroundColor:'#3b3b3b',
    fontFamily:'Medel',
    color:'#ffffff',
    alignItems:'center',
    paddingBottom:100,
    height:1000
  },
  trackingText: {
    fontSize:20,
    color:'#f86e00',
    marginTop:20
  },
  timerContainer:{
    position: 'absolute',
    top: -155,
    padding: 5,
    width: 240,
  },
   timerText: {
    position: 'absolute',
    top: -125,
    marginLeft:30,
    fontSize: 36,
    color: '#ffa028',
    textShadowColor: 'black',
    textShadowOffset:{width: 2, height:2},
    textShadowRadius: 1
  }
});