import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal
} from 'react-native';

import moment from 'moment';

export default class DemoLeaderboardListItem extends Component {

	constructor() {
    	super();

    this.state = {
    }
  }

  _toTime(milliseconds) {
    const duration = moment.duration(milliseconds);

    const pad = (n) => n >= 10 ? n : '0' + n;
    
    return pad(duration.minutes()) + ':' +
    pad(duration.seconds()) + ':' +
    pad(Math.floor(duration.milliseconds() / 10));
  }

	render() {
    
     return(

      <View style={localStyles.row}>

        <Text style={localStyles.rowText}>{this.props.position + 1} </Text>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.mode} </Text>

        <Text style={localStyles.rowText}>{this.props.leaderboardItem.crypto} </Text>

        <Text style={localStyles.rowText}>{this._toTime(this.props.leaderboardItem.time)} </Text>
        
      </View>
           );
	}
}

var localStyles = StyleSheet.create({
  row: {

    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row',
    margin:2,
    padding:2
  },
  highlightedRow : {
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row',
    margin:2,
    padding:2,
    backgroundColor: '#ffa028'
  },
  rowText : {
    height:18,
    fontSize:18,
    flex: 1, 
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#fff'
  }
});