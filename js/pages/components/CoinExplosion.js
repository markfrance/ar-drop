import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroParticleEmitter,
  ViroNode,
  ViroSound
  } from 'react-viro';



export default class CoinExplosion extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	     
      };

	}

  	render() {
  		return(
        <ViroNode position={[0,0,0]}>
         <ViroSound paused={false} muted={false} loop={false}
            source={require("../../../public/sounds/coins.mp3")} />
          <ViroParticleEmitter
            position={[0, 0, 0]}
            duration={1000}
            visible={true}
            delay={0}
            run={true}
            loop={false}
            fixedToEmitter={true}

            image={{
              source:require("../../../public/images/Icons/android/Icon-36.png"),                 
              height:0.1,
              width:0.1,
              bloomThreshold:0.2
            }}

            spawnBehavior={{
              particleLifetime:[1000,1000],
              emissionRatePerSecond:[150, 200], 
              spawnVolume:{
                shape:"box", 
                params:[20, 1, 20], 
                spawnOnSurface:false
              },
              maxParticles:800
            }}

            particleAppearance={{
              opacity:{
                initialRange:[0, 0],
                factor:"time",
                interpolation:[
                  {endValue:0.5, interval:[0,500]},
                  {endValue:1.0, interval:[4000,5000]}
                ]
              },

              rotation:{
                initialRange:[0, 360],
                factor:"time",
                interpolation:[
                  {endValue:1080, interval:[0,5000]},
                ]
              },

              scale:{
                initialRange:[[5,5,5], [10,10,10]],
                factor:"time",
                interpolation:[
                  {endValue:[3,3,3], interval:[0,4000]},
                  {endValue:[0,0,0], interval:[4000,5000]}
                ]
              },
            }}
            
            particlePhysics={{
              velocity:{
              initialRange:[[-2,-.5,0], [2,-3.5,0]]}
            }}
          />
        </ViroNode>

      		);
  	}
}

module.exports = CoinExplosion;