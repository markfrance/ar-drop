import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class DemoCryptoSelectionScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
      mode: props.navigation.state.params.mode
    	}
	}

	render() {
		return(
			<View style={localStyles.main}>
				<Text style={localStyles.header}>Select A Cryptocurrency</Text>
          <TouchableOpacity
  				  onPress={() => this.props.navigation.navigate('Parachute',
            {mode: this.state.mode, crypto:'BTC'})}>
              <Image style={localStyles.button} 
               	source={require('../../public/images/BitcoinSelection.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
				  onPress={() => this.props.navigation.navigate('Parachute',
          {mode: this.state.mode, crypto:'ETH'})}>
            <Image style={localStyles.button} 
             source={require('../../public/images/EthereumSelection.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Parachute',
          {mode: this.state.mode, crypto:'CLASH'})}>
            <Image style={localStyles.button} 
             source={require('../../public/images/ClashSelection.png')}/>
          </TouchableOpacity>
			</View>);
	}

}


var localStyles = StyleSheet.create({
  main: {
  	textAlign:'center',
    backgroundColor:'#3b3b3b',
    fontFamily:'Medel',
    color:'#ffffff',
    alignItems:'center',
    paddingBottom:100
  },
  item: {
    alignItems:'center'
  },
  header: {
    marginTop:25,
  	fontSize: 30,
  	color:'#f86e00'
  },
  button: {
    marginTop:40,
  	width:150,
    height:150
  },
  degreesText:{
  	fontSize:35,
  	position:'absolute',
  	top:85,
    color:'white'
  },
  description:{
    marginTop:20,
  	fontSize:25,
    color:'white'
  }
});