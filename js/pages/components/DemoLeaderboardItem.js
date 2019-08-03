import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal
} from 'react-native';

export default class DemoLeaderboardListItem extends Component {

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
      <View style={this.props.leaderboardItem.isHighlighted == true ? localStyles.highlightedRow : localStyles.row}>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.place} </Text>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.mode} </Text>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.crypto} </Text>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.time} </Text>
        
      </View>
           
  </TouchableHighlight>);
	}
}

var localStyles = StyleSheet.create({
  row: {
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row',
    margin:5
  },
  highlightedRow : {
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row',
    margin:5,
    backgroundColor: '#ffa028'
  },
  rowText : {
    height:25,
    flex: 1, 
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#fff'
  }
});