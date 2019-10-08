import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

export default class DemoStartScreen extends Component {
  
  constructor(props) {
  	super(props);

  }

 componentDidMount() {
 	AsyncStorage.getItem('hasLoaded', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          this.props.navigation.navigate('DemoHowTo');
        } else {
          
          this.props.navigation.navigate('DemoMode');
          console.log("result", result);
        }
      }
    });
    
    AsyncStorage.setItem('hasLoaded', JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
	}	

	render() {
		return null;
	}
}
