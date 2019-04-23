import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

import Swiper from 'react-native-swiper';

export default class HowToFirstScreen extends Component {

	constructor() {
	    super();

	    this.state = {
	    }
	}

  render() {
    return (

      <Swiper loop={false} showsPagination={true} index={0}
      dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: '#ffa028', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
         >
           <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowTo1.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowTo2.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
          <TouchableHighlight style={{flex:1}}
            onPress={() => this.props.navigation.navigate('Airdrop')}
            >
            <Image source={require("../../public/images/CryptoClashHowTo3.png")}
            style={localStyles.splashImage}/>
            
            </TouchableHighlight>
          </View>
        </Swiper>
    );
  }
}

var localStyles = StyleSheet.create({

	splashImage : {
    flex:1, 
    width:'auto',
    resizeMode:'contain'
  },
  	okButton : {
  	width:50, 
  	height:50
  	}
});
