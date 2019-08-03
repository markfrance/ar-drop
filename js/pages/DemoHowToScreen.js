import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

import Swiper from 'react-native-swiper';

export default class DemoHowToScreen extends Component {

	constructor() {
	    super();

	    this.state = {
	    }
	}

  render() {
    return (

      <Swiper loop={false} showsPagination={true} index={0}
      dot={<View style={localStyles.swiper} />}
          activeDot={<View style={localStyles.dots} />}
         >
           <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowToPractice1.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowToPractice2.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowToPractice3.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
          <TouchableHighlight style={{flex:1}}
            onPress={() => this.props.navigation.navigate('DemoMode')}
            >
            <Image source={require("../../public/images/CryptoClashHowToPractice4.png")}
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
  swiper: {
    backgroundColor: 'rgba(255,255,255,.3)', 
    width: 13, 
    height: 13, 
    borderRadius: 7, 
    marginLeft: 7, 
    marginRight: 7
  },
  dots: {
    backgroundColor: '#ffa028', 
    width: 13, 
    height: 13, 
    borderRadius: 7, 
    marginLeft: 7, 
    marginRight: 7
  }
});
