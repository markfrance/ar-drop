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

      <Swiper loop={false} showsPagination={true} index={0}>
           <View style={{flex:1}}>
            <Image source={require("../../public/images/HowToAfterSplash1.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
            <Image source={require("../../public/images/HowToAfterSplash2.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={{flex:1}}>
            <Image source={require("../../public/images/HowToAfterSplash3.png")}
            style={localStyles.splashImage}/>
            <TouchableHighlight style={localStyles.okButton} 
            onPress={() => this.props.navigation.navigate('MapView')}
            >
            <Image source={require("../../public/images/ar_d_ok_icon.png")} 
            style={localStyles.okButton} />
        </TouchableHighlight>
          </View>
        </Swiper>
    );
  }
}

var localStyles = StyleSheet.create({

	splashImage : {
    flex:1, 
    width:400,
    resizeMode:'contain'
  },
  	okButton : {
  	width:50, 
  	height:50
  	}
});
