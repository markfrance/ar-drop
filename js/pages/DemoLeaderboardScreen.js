import React, { Component } from 'react';
import {
	View, 
  Alert,
	Image, 
	Text,
  Animated,
	StyleSheet, 
	TouchableHighlight,
	Modal,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Svg, { Path } from 'react-native-svg';


import DemoLeaderboardItem from './components/DemoLeaderboardItem.js';
import LeaderboardData from '../../data/demoleaderboard.json';
import { BezierCurve } from './components/BezierCurve';
import { clearLeaderboard, getAllLeaderboardData, addNewTime } from '../LocalLeaderboardStorage.js';

export default class DemoLeaderboardScreen extends Component {
	
	constructor(props) {
	    super(props);

	    this.state = {
        leaderboardData: [],
        mode:props.navigation.state.params.mode,
        crypto:props.navigation.state.params.crypto,
        time:props.navigation.state.params.time
	    }
  }

  componentDidMount() {

     addNewTime({
      "mode": this.state.mode,
        "crypto": this.state.crypto,
        "time":this.state.time
    });


    getAllLeaderboardData().then((data) => {
      
    this.setState({
      leaderboardData: JSON.parse("["+data+"]"),
      test: data
      //leaderboardData: LeaderboardData
    })});
    
  }

	render() {
    return (
      <View style={localStyles.leaderboard}>
        <Text style={localStyles.headerText}> YOUR FASTEST TIMES</Text>
        <View style={localStyles.row}>
          <Text style={localStyles.rowText}> PLACE </Text>
          <Text style={localStyles.rowText}> MODE </Text>
          <Text style={localStyles.rowText}> CRYPTO </Text>
          <Text style={localStyles.rowText}> TIME </Text>
        </View>
        <View style={{flex:1}}>
          <FlatList 
          data={this.state.leaderboardData}
          renderItem={({item, index}) => <DemoLeaderboardItem leaderboardItem={item} position={index}
          navigation={this.props.navigation}/> }
          />
         
        </View>
        <View>
            </View>
          
         <View style={localStyles.waveFooter}>
          
            <Svg
            width={Dimensions.get('window').width}
            height={160}
            viewBox="0 0 825 300"
            >
              <Path
              d="M0 181.615c3.252.4 6.48.974 9.67 1.72 43.07 12.29 86 25.23 129.2 36.86 30.4 8.17 61.16 15.17 92 21.59 21.54 4.49 43.4 7.75 65.25 10.36a546.99 546.99 0 0 0 57 3.92c26.83.36 50.57-8 70.64-26.92 16.1-15.19 29.17-32.62 41.72-50.54 17.91-25.56 34.87-51.8 53.31-77 13.39-18.28 27-36.49 44.42-51.53 25.67-22.08 54.66-37.19 87.67-44.89a195.85 195.85 0 0 1 58.39-4.71c35 2.44 67.68 12.82 97 32.56 6.17 4.15 11.84 9 17.74 13.58v262H0v-127z"
              fill="#ffa028"
              />
              <Path d="M0 308h824v1200H0V308z" fill="#ffa028" />
            </Svg>
          

          <TouchableOpacity style={localStyles.backButton}
            onPress={() => this.props.navigation.navigate('DemoMode')}
            >
          <Image source={require('../../public/images/CryptoClash-Back-Arrow.png')}
          style={localStyles.backImage}/>
          </TouchableOpacity>

           <TouchableOpacity style={localStyles.playAgain}
            onPress={() => this.props.navigation.navigate('Parachute',
            {mode:this.state.mode, crypto:this.state.crypto})}
            >
            <Text style={localStyles.playAgainButton}> Play Again </Text>
          </TouchableOpacity>
          </View>         
      </View>

    );
   }
}

var localStyles = StyleSheet.create({
  leaderboard: {
    backgroundColor: '#3b3b3b',
    fontFamily:'Medel',
    flex:1
  },
  headerText: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
    color: '#ffa028'
  },
  waveFooter: {
    height:150,
    bottom:0
  },
  row: {
    fontSize:18,
    flexDirection: 'row',
    marginBottom: 15,
    color: '#ffa028'
  },
  rowText: {
    fontSize:18,
    flex: 1, 
    textAlign: 'center',
    color: '#ffa028'
  },
  waveImage: {
    width:400,
    height:150
  },
  yourPosition: {
    color: '#fff',
    position:'absolute',
    top: 35,
    right: 40
  },
  positionText: {
    color: '#fff',
    position:'absolute',
    top: 55,
    right: 55,
    fontSize: 40
    
  },
  playAgain: {
    position: 'absolute',
    bottom:40,
    right: 15
  },
  playAgainButton: {
    textAlign:'center',
    padding:5,
    fontSize:18,
    width:120,
    color:'white',
    borderColor:'white',
    borderWidth:2,
    borderRadius:20
  },
  backButton: {
    position:'absolute',
    bottom:10,
    left:10
  },
  backImage: {
    height:30,
    width:30
  }
});


