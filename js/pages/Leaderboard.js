import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal,
  FlatList
} from 'react-native';

import LeaderboardListItem from './components/LeaderboardListItem.js';
import LeaderboardData from '../../data/leaderboard.json';

export default class Leaderboard extends Component {
	
	constructor() {
	    super();

	    this.state = {
	    }
  	}

	render() {
    return (
      <View style={localStyles.leaderboard}>
        <Text style={localStyles.headerText}> LEADER BOARD</Text>
        <View style={localStyles.row}>
          <Text style={localStyles.rowText}> PLAYER </Text>
          <Text style={localStyles.rowText}> TIME </Text>
          <Text style={localStyles.rowText}> ATTEMPTS </Text>
          <Text style={localStyles.rowText}> PRIZE </Text>
        </View>
        <FlatList
          data={LeaderboardData}
          renderItem={({item}) => <LeaderboardListItem leaderboardItem={item} 
          navigation={this.props.navigation}/> }
        />
        <View style={localStyles.waveFooter}>
        
          <Image 
            source={require("../../public/images/CryptoClash-Leaderboard-Wave.png")}
            style={localStyles.waveImage} />
          <Text style={localStyles.yourPosition}> Your Position </Text>
          <Text style={localStyles.positionText}> 3rd </Text>

          <TouchableHighlight style={localStyles.playAgain}
            onPress={() => this.props.navigation.navigate('Airdrop')}
             >
             <Image source={require("../../public/images/CryptoClash-Leaderboard-Play-Again-Button.png")}
              style={localStyles.playAgainButton}
               />
              
          
          </TouchableHighlight>
           <TouchableHighlight
           style={localStyles.backArrow} 
            onPress={() => this.props.navigation.navigate('Airdrop')}
             >
             <Image source={require("../../public/images/CryptoClash-Back-Arrow.png")}
              style={localStyles.backArrowButton} />
          
          </TouchableHighlight>


        </View>
      
      </View>
    );
   }
}

var localStyles = StyleSheet.create({
  leaderboard: {
    backgroundColor: '#3b3b3b'
  },
  headerText: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
    color: '#ffa028'
  },
  waveFooter: {
    position:'absolute',
    height: 150,
    width:400,
    bottom:145
  },
  row: {
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row',
    marginBottom: 30,
    color: '#ffa028'
  },
  rowText: {
    height:25,
    flex: 1, 
    alignSelf: 'stretch',
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
    top: 110,
    right: 30,
  },
  playAgainButton: {
    height: 20,
    width:120
  },
  backArrow: {
    position: 'absolute',
    top: 110,
    left: 10
  },
  backArrowButton: {
    height:30,
    width:30
  }
});


