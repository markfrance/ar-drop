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

	constructor(props) {
    	super(props);

    this.state = {
      	joined : true,
        timer : props.airdropItem.startTime
    }
  }

  componentDidMount() {
    this.interval = setInterval(
    () => this.setState(({ timer: this.state.timer - 1 })),
    1000
    );
  }

  componentDidUpdate(){
    if(this.state.timer < 0){ 
      this.setState({timer: 0});
      clearInterval(this.interval);
      //Start game
    }
  }

  navigateToPregameScreen() {

  }

	render() {
    var imagePath = '../../../public/images/' + this.props.airdropItem.image;
      var startTime = new Date(this.state.timer * 1000).toISOString().substr(11, 8);
   
    return(
			<TouchableHighlight style={localStyles.buttons}
            onPress={() => this.props.navigation.navigate('Parachute')}
             >
        <View style={localStyles.container}>

          <Text style={localStyles.buttonText}> {this.props.airdropItem.value} {this.props.airdropItem.tokenName}</Text>
    
          <Image source={require('../../../public/images/CryptoClash-List-Clash-Token.png')}  
          style={localStyles.buttonImage} />
          <Image source={require('../../../public/images/Icons/GameTimerIcon.png')}
          style={localStyles.clockIcon} />
          <Text style={localStyles.airdropTimer}>{startTime}</Text> 
          {this._renderGameIcon()}
          <Image source={require('../../../public/images/Icons/EmptyIcon.png')}
          style={localStyles.percentIcon} />
          <Text style={localStyles.percentAmount}> {this.props.airdropItem.percentAmount}%</Text>
          {this._renderJoined()}
        </View>
           
      </TouchableHighlight>
    );
	}

  _renderJoined() {
    if(this.props.airdropItem.joined) {
      return(
        <Image source={require('../../../public/images/CryptoClash-Joined-Sash.png')}
      style={localStyles.joinedFlag} />
      );
    }
  }

  _renderGameIcon() {
    var gameType = this.props.airdropItem.type;
    if(gameType === "parachute") {
      return (<Image source={require('../../../public/images/Icons/ParachuteIcon.png')}
      style={localStyles.gameIcon} />);
    }
    else if(gameType === "geo") {
      return (<Image source={require('../../../public/images/Icons/GeoGameIcon.png')}
      style={localStyles.gameIcon} />);
    }
    else if(gameType == "portal") {
      return (<Image source={require('../../../public/images/Icons/PortalGameIcon.png')}
      style={localStyles.gameIcon} />);
    }
    else {
      return (<Image source={require('../../../public/images/Icons/EmptyIcon.png')}
      style={localStyles.gameIcon} />);
    }
  }
}

var localStyles = StyleSheet.create({
  airdropTimer: {
    fontSize: 12,
    position:'absolute', 
    top:60,
    color:'#fff',
    right:45
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
  container: {
    backgroundColor:'#3b3b3b'
  },
  clockIcon : {
  	position:'absolute', 
    top:55,
    right:5,
    width:25, 
    height:25
  },
  gameIcon : {
    position:'absolute', 
    top:55,
    left:5,
    width:25, 
    height:25
  },
  percentAmount : {
    position:'absolute', 
    fontSize: 8,
    top: 92,
    left: 7
  },
  percentIcon : {
    position:'absolute', 
    top:85,
    left:5,
    width:25, 
    height:25
  },
  header: {
    backgroundColor:'#f86e00', 
    height:50
  },
  infoIcon : {
  	position:'absolute', 
  	top:55,
  	right:5,
  	width:25, 
  	height:25
  },
  joinedFlag : {
  	position:'absolute', 
  	top:95,
  	right:1,
  	width:100, 
  	height:100
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign:'center'
  }
});