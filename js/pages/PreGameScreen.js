import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight
} from 'react-native';

export default class PreGameScreen extends Component {
	
	constructor(props) {
	    super(props);

	    this.state = {

	    }

  	}

  	render() {
  		return(
  			<View>
	  			<View>
	  				<Text style={localStyles.header}> Clash Starts In </Text>
	  				<Text style={localStyles.timer}> 7h 16m 10s </Text>
	  			</View>
	  			<View>
	  				<Text style={localStyles.subheader}>Clash Details</Text>
	  				<View style={localStyles.leftBox}>
	  					<View style={localStyles.leftColumn}>
	  						<Text style={localStyles.label}>Percentage</Text>
	  						<Text style={localStyles.description}>VOLUME OF PRIZES TO JOIN</Text>
	  						<Text style={localStyles.label}>Players</Text>
	  						<Text style={localStyles.description}>MAXIMUM PARTICIPANTS</Text>
	  						<Text style={localStyles.label}>Joined</Text>
	  						<Text style={localStyles.description}>TOTAL PLAYERS JOINED</Text>
	  						<Text style={localStyles.label}>Entries</Text>
	  						<Text style={localStyles.description}>ATTEMPS BY ALL PLAYERS</Text>
	  					</View>
	  					<View style={localStyles.rightColumn}>
	  						<Text style={localStyles.value}>1%</Text>
	  						<Text style={localStyles.value}>1000</Text>
	  						<Text style={localStyles.value}>88</Text>
	  						<Text style={localStyles.value}>580</Text>
	  					</View>
	  				</View>
	  				<Text style={localStyles.subheader}>Trade Volume</Text>
	  				<View style={localStyles.leftBox}>
	  					<View style={localStyles.leftColumn}>
	  						<Text style={localStyles.label}>24hr</Text>
	  						<Text style={localStyles.description}>YOUR VOLUME IN THE PAST 24 HOURS</Text>
	  						<Text style={localStyles.label}>Used</Text>
	  						<Text style={localStyles.description}>VOLUME USED JOINING CLASHES</Text>
	  						<Text style={localStyles.label}>Available</Text>
	  						<Text style={localStyles.description}>AVAILABLE TO JOIN CLASHES</Text>
	  						<Text style={localStyles.label}>Per Entry</Text>
	  						<Text style={localStyles.description}>VOLUME REQUIRED PER ENTRY</Text>
	  					</View>
	  					<View style={localStyles.rightColumn}>
	  						<Text style={localStyles.value}>$66.50</Text>
	  						<Text style={localStyles.value}>$65</Text>
	  						<Text style={localStyles.value}>$2.90</Text>
	  						<Text style={localStyles.value}>$2.90</Text>
	  					</View>
	  				</View>
	  				<Text style={localStyles.subheader}>Prizes</Text>
	  				<View style={localStyles.rightBox}>
	  					<Image source={require('../../public/images/CryptoClash-List-Clash-Token.png')}  
          					style={localStyles.cryptoLogo} />
          				<View style={localStyles.leftColumn}>
          					<Text style={localStyles.label}>Total Prizes </Text>
          				</View>
          				<View style={localStyles.rightColumn}>
          					<Text style={localStyles.value}> 100000 Clash</Text>
          				</View>
          				<Text style={localStyles.description}> Once entries reach 1000 </Text>
	  				</View>

	  			</View>
  			</View>);
  		}
  }

var localStyles = StyleSheet.create({
	main:{
    	backgroundColor: '#3b3b3b',
    	fontFamily:'Medel',
    	color:'#fff'
	},
	header: {
		marginTop:20
	},
	timer: {
		fontSize:16
	},
	subheader: {
		fontSize:16
	},
	label: {
		fontSize:16
	},
	description: {
		fontSize:12
	},
	value: {
		fontSize:16
	},
	leftBox: {
		width:300
	},
	rightBox: {
		width:300
	},
	leftColumn: {
		width:100
	},
	rightColumn: {
		width:100
	}
});