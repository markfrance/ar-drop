import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class DemoModeSelectionScreen extends Component {

	constructor() {
		super();

		this.state = {

    	}
	}

	render() {
		return(
			<View style={localStyles.main}>
				<Text style={localStyles.header}>Select A Game To Practise</Text>
				<View style={localStyles.item}>
          <TouchableOpacity
  				  onPress={() => this.props.navigation.navigate('DemoCrypto', {mode:'180'})}>
              <Image style={localStyles.button} 
               	source={require('../../public/images/Icons/ParachuteIcon.png')}/>
          </TouchableOpacity>
          <Text style={localStyles.degreesText}> 180</Text>
          <Text style={localStyles.description}> 180° Mode </Text>
        </View>
        <View style={localStyles.item}>
          <TouchableOpacity
				  onPress={() => this.props.navigation.navigate('DemoCrypto', {mode:'360'})}>
            <Image style={localStyles.button} 
             source={require('../../public/images/Icons/ParachuteIcon.png')}/>
          </TouchableOpacity>
          <Text style={localStyles.degreesText}> 360</Text>
        
          <Text style={localStyles.description}> 360° Mode </Text>
        </View>
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
  	width:200,
    height:200
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