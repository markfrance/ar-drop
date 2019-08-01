import React, { Component } from 'react';
import {
	View, 
	Image, 
	Text,
	StyleSheet, 
	TouchableHighlight,
	Modal,
  FlatList
} from 'react-native';

import {ButtonGroup} from 'react-native-elements';

import AirdropListItem from './components/AirdropListItem.js';
//import AirdropModal from './components/AirdropModal.js';
import UpcomingClashes from '../../data/upcomingclashes.json';
import ActiveClashes from '../../data/activeclashes.json';
import EndedClashes from '../../data/endedclashes.json';

 const UpcomingButton = () => <Text style={localStyles.buttonText}>Upcoming</Text>;
  const ActiveButton = () => <Text style={localStyles.buttonText}>Active</Text>;
  const EndedButton = () => <Text style={localStyles.buttonText}>Ended</Text>;


export default class AirdropList extends Component {
	
	constructor() {
	    super();

	    this.state = {
	      modalStatus : false,
        clashData : UpcomingClashes,
        selectedIndex : 0
	    }

      this._updateIndex = this._updateIndex.bind(this);
  	}

  _updateIndex(selectedIndex) {

    if(selectedIndex == 0) {
      //TODO: Replace with API calls
      clashList = UpcomingClashes;
    }
    if(selectedIndex == 1) {
      clashList = ActiveClashes;
    }
    if(selectedIndex == 2) {
      clashList = EndedClashes;
    }

    this.setState({
      selectedIndex: selectedIndex,
      clashData : clashList
    });
  }


 
	render() {
    const buttons = [{ element: UpcomingButton }, 
    { element: ActiveButton }, 
    { element: EndedButton }]
  
    return (
      <View style={localStyles.mainView}>
        <ButtonGroup
          onPress={this._updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={buttons}
          buttonStyle={{borderWidth:0}}
          innerBorderStyle={{width:0}}
          containerStyle={{height:30,borderWidth:0, backgroundColor:'#3b3b3b'}}
          selectedButtonStyle={{borderBottomWidth:2, borderRightWidth:0, borderLeftWidth:0, borderBottomColor:'#f86e00',backgroundColor:'#3b3b3b'}}
          />
        <FlatList
          data={this.state.clashData}
          renderItem={({item}) => 
            <AirdropListItem 
              airdropItem={item} 
              navigation={this.props.navigation}
            />}
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
  mainView: {
    backgroundColor:'#3b3b3b'
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
  },
  topButton : {
    flex: 1, 
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  buttonText: {
    color:'#f86e00',
    borderWidth: 0
  }
});


