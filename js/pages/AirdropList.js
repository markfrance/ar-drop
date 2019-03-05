import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal
} from 'react-native';

import AirdropListItem from './components/AirdropListItem.js';
import AirdropData from '../../data/airdropinfo.json';

export default class AirdropList extends Component {
	
	constructor() {
	    super();

	    this.state = {
	      modalStatus : true,
	    }
  	}

	render() {
    return (
      <View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalStatus}
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

              <View style={localStyles.row}>
                <TouchableHighlight
                onPress={this._setModal(false)}>
                  <Image source={require("../../public/images/ar_d_back_icon.png")}
                  style={localStyles.smallIcon} />
                </TouchableHighlight>
                <TouchableHighlight
                onPress={this.props.navigation.navigate('HowToRedrop')}>
                  <Image source={require("../../public/images/ar_d_ok_icon.png")}
                  style={localStyles.smallIcon} />
                </TouchableHighlight>
              </View>
              <Text style={localStyles.modalText}>Airdrop Hunters 0/1000</Text>
          </View>
        </Modal>
      <FlatList
  data={AirdropData}
  renderItem={({item}) => <AirdropListItem airdropItem={item} /> }
	/>
      </View>
    );
   }

   _setModal(modalStatus) {
    return () => {
      this.setState({
        modalStatus : modalStatus
      })
    }
  }

}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor:"transparent"
  },
  headerText: {
    color:'#f86e00',
    textAlign:'center',
    fontSize : 35
  },
  modalText: {
    padding:20,
    fontSize:20
  },
  modalTimer: {
    fontSize:35
  },
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
  buttons : {
    flex: 1,
    height: 200,
    backgroundColor:'#f86e00',
    borderWidth: 1,
    borderColor: '#fff'
  },
  modal : {
    marginTop:100,
    backgroundColor:'#fff',
    height:500,
    borderColor:'#f86e00',
    borderWidth:5,
    borderRadius:15,
    alignItems:'center'
  },
  smallIcon : {
  	width:100, 
  	height:100
  },
  row : {
  	flex:1, 
  	flexDirection:'row'
  }
});