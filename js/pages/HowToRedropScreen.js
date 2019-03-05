import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

import Swiper from 'react-native-swiper';

export default class HowToRedropScreen extends Component {

	render() {
 	return (

      <Swiper loop={false} showsPagination={true} index={0}>
           <View style={localStyles.flex}>
            <Image source={require("../../public/images/HowToRedrop1.png")}
            style={localStyles.splashImage}/>
          </View>
          <View style={localStyles.flex}>
            <Image source={require("../../public/images/HowToRedrop2.png")}
            style={localStyles.splashImage}/>
            <TouchableHighlight style={localStyles.okButton} 
            onPress={this.props.navigation.navigate('ARView')}
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
  flex : {
  	flex: 1
  },
  okButton : {
  	width:50, 
  	height:50
  }
});