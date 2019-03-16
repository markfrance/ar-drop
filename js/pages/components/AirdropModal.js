import React, { Component } from 'react';
import {
  View, 
  Image, 
  Text,
  StyleSheet, 
  TouchableHighlight,
  Modal
} from 'react-native';

export default class AirdropModal extends Component {
	
	render() {
    return (

    	<Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalStatus == FREE_MODAL}
          >
          <View style={localStyles.modal}>
          
              <Text style={localStyles.headerText}>PRIZE: 1BTC</Text>
              <Text style={localStyles.headerText}>VALUE: $3500</Text>
              <Text style={localStyles.headerText}>ENTRY: 1%</Text>

              <Text style={localStyles.modalText}>Joining this contest is free for 
              the first 500 entries but your
              wallet must hold a minimum 
              of 1% of the prize in ARD
              in order to participate</Text>

              <Text style={localStyles.headerText}>AIRDROP STARTS IN</Text>
              <Text style={localStyles.modalTimer}>00h 33m 21s</Text>

              <View style={{flex:1, flexDirection:'row'}}>
                <TouchableHighlight
                onPress={() => this._setModal(HIDE_MODAL)}>
                  <Image source={require("./public/images/ar_d_back_icon.png")}
                  style={{width:100, height:100}} />
                </TouchableHighlight>
                <TouchableHighlight
                onPress={() => this.props.navigation.navigate("MapView")}>
                  <Image source={require("./public/images/ar_d_ok_icon.png")}
                  style={{width:100, height:100}} />
                </TouchableHighlight>
              </View>
              <Text style={localStyles.modalText}>Airdrop Hunters 0/1000</Text>
           
          </View>
        </Modal>
    );
    }
}