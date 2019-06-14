import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroConstants,
  ViroAnimatedImage,
  ViroParticleEmitter,
  ViroARCamera
} from 'react-viro';

import renderIf from '../renderif';
import locationMath from '../locationMath';

export default class ARScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
     runFireworks : false,
     showLeft : false,
     showRight : false,
     bitcoinX: -1,
     bitcoinZ: -1,
     markerScale: 0.1
    };

    this._processCameraPosition = this._processCameraPosition.bind(this);

    var bitcoinLocation = locationMath.transformPointToAR(
        this.props.sceneNavigator.viroAppProps.lat,
        this.props.sceneNavigator.viroAppProps.long,
        this.props.sceneNavigator.viroAppProps.currentLatitude, 
        this.props.sceneNavigator.viroAppProps.currentLongitude);

    
    this.state.bitcoinX = bitcoinLocation.x;
    this.state.bitcoinZ = bitcoinLocation.z;
  }


  _processCameraPosition(cameraPosition) {
    //Scale marker
    var distance = locationMath.distanceBetweenTwoPoints
    (cameraPosition.position, 
      [this.state.bitcoinX, 0, this.state.bitcoinZ ]);

    this.setState(state => {
      markerScale: state.markerScale * distance
    })

    //Determine if marker is in field of view and show arrows
    if(cameraPosition.forward.x > (this.state.bitcoinX + 5))
      this.setState({showLeft: true});
    else if(cameraPosition.forward.x < (this.state.bitcoinX - 5))
      this.setState({showRight: true});
    else
      this.setState({showLeft: false, showRight: false});
   
  }

  render() {
    return (
   
      <ViroARScene
      style={{backgroundColor:'transparent'}}
      onCameraTransformUpdate={this._processCameraPosition} >
       
       {renderIf(false,
        <ViroAnimatedImage
          source={require('../../public/images/BTC-Spinning_small.gif')} 
          scale={[.5, .5, .5]} 
          position={[this.state.bitcoinX, 0, this.state.bitcoinZ]}
        />)}

         <ViroImage
          source={require('../../public/images/ar_d_marker.png')} 
          scale={[this.state.markerScale, .1, this.state.markerScale]} 
          position={[this.state.bitcoinX, 0, this.state.bitcoinZ]}
          style={localStyles.centreArrow}
        />
        
        {renderIf(this.state.runFireworks,
        <ViroParticleEmitter
          position={[0, 0, -1]}
          duration={20000}
          run={this.state.runFireworks}
          
          image={{
            source:require('../../public/images/particle_fire.png'),                 
            height:0.1,
            width:0.1,
          }}
        />)}


        <ViroARCamera>
        
          {renderIf(this.state.showLeft,
           <ViroImage
            source={require('../../public/images/ar_d_left.png')} 
            scale={[.1, .1, .1]} 
            position={[0, 0, -10]}
            style={localStyles.centreArrow}
          />
          )}

          {renderIf(this.state.showRight,
           <ViroImage
            source={require('../../public/images/ar_d_right.png')} 
            scale={[.1, .1, .1]} 
            position={[0, 0, -10]}
            style={localStyles.centreArrow}
          />
          )}
        </ViroARCamera>
      </ViroARScene>
    );
  }
}

var localStyles = StyleSheet.create({
   arrowContainer : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centreArrow : {
    width: 50,
    height: 50
    
  }
});


module.exports = ARScene;
