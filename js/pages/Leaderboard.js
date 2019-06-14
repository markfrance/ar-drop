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
      <View>
        <FlatList
          data={LeaderboardData}
          renderItem={({item}) => <LeaderboardListItem leaderboardItem={item} 
          navigation={this.props.navigation}/> }
        />
        <View style={localStyles.waveFooter}>
          <Image source={require("../../public/images/CryptoClash-Leaderboard-Wave.png")}
                  style={localStyles.waveImage} />
        </View>
      </View>
    );
   }
}

var localStyles = StyleSheet.create({
  waveFooter : {
    position: 'absolute',
    top: 150,
    height: 150,
    backgroundColor: 'transparent'
  }
});


