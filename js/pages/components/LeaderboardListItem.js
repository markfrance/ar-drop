import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal
} from 'react-native';

export default class LeaderboardListItem extends Component {

	constructor() {
    	super();

    this.state = {
    }
  }

  

	render() {
    
     return(
			<TouchableHighlight
            onPress={() => this.props.navigation.navigate('Airdrop')}
             >
      <View >

      <Text style={localStyles.rowText}>{this.props.leaderboardItem.player} </Text>

      <Text style={localStyles.rowText}>{this.props.leaderboardItem.time} </Text>

      <Text style={localStyles.rowText}>{this.props.leaderboardItem.attempts} </Text>

      <Text style={localStyles.rowText}>{this.props.leaderboardItem.prize} </Text>
      </View>
           
  </TouchableHighlight>);
	}

 
}

var localStyles = StyleSheet.create({
  rowText : {
    width:60
  }
});