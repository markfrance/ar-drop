
import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal
} from 'react-native';

export default class AirdropListItem extends Component {

	constructor() {
    	super();

    this.state = {
    	item : [],
      	joined : false,
    }
  	}

	render() {
		return(
			<TouchableHighlight style={localStyles.buttons}
            onPress={this.props.navigation.navigate('Airdrop')}
             >
    <View >
      <View style={{backgroundColor:'#f86e00', height:50}}>
        <Text style={localStyles.buttonText}> {this.state.item.value} {this.state.item.tokenName}</Text>
      </View>
      <Image source={require(this.state.item.image)}  
      style={localStyles.buttonImage} />
     
      <Image source={require('../../../public/images/ar_d_clock_icon.png')}
      style={localStyles.clockIcon} />
      <Text style={localStyles.airdropTimer}>0h33m32s</Text> 
      <Image source={require('../../../public/images/ar_d_info_icon.png')}
      style={localStyles.infoIcon} /> 
       {this._renderJoined()}
    </View>
           
  </TouchableHighlight>);
	}


  _renderJoined() {
    if(this.state.joined) {
      return(
        <Image source={require('../../../public/images/ar_d_camera_icon.png')}
      style={localStyles.joinedFlag} />
      
      );
    }
  }
}

var localStyles = StyleSheet.create({
  airdropTimer: {
    fontSize: 10,
    position:'absolute', 
    top:55,
    left:30
  },
  buttonText: {
    marginTop:10,
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttonImage : {
  	position:'absolute',
  	left:0, 
  	top:50,
  	height:150, 
  	width:380
  },
  buttons : {
    flex: 1,
    height: 200,
    backgroundColor:'#f86e00',
    borderWidth: 1,
    borderColor: '#fff'
  },
  clockIcon : {
  	position:'absolute', 
  	top:50,
  	left:0,
  	width:25, 
  	height:25
  },
  infoIcon : {
  	position:'absolute', 
  	top:50,
  	right:0,
  	width:25, 
  	height:25
  },
  joinedFlag : {
  	position:'absolute', 
  	top:170,
  	right:0,
  	width:30, 
  	height:30
  }
});