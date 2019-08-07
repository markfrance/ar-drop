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
            duration={2000}
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
              emissionBurst:[
                {time:1, min:300, max:550, cycles:1}],
              spawnVolume:{
                shape:"sphere", 
                params:[10, 10, 10], 
                spawnOnSurface:false
              },
              maxParticles:100
            }}

            particleAppearance={{
              opacity:{
                initialRange:[0, 0],
                factor:"Time",
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
                explosiveImpulse:{impulse:0.12 * 10,
                  position:[0,0,0],
                  decelerationPeriod:1.0}
              }}
          />
        </ViroNode>

      		);
  	}
}

module.exports = CoinExplosion;