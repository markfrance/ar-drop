import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroParticleEmitter,
  ViroNode,
  ViroSound
  } from 'react-viro';

export default class BombExplosion extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	     
      };
	}

  	render() {
  		return(

        <ViroNode position={[0,0,0]}>
         <ViroSound paused={false} muted={false} loop={false}
            source={require("../../../public/sounds/explosion.wav")}
            volume={1.0} />
            <ViroParticleEmitter
              position={[0, 4.5, 0]}
              duration={3000}
              visible={true}
              delay={0}
              run={true}
              loop={false}
              fixedToEmitter={true}

              image={{
                source:require("../../../public/images/particle_fire.png"),                 
                height:1,
                width:1,
                bloomThreshold:0.8
              }}

              spawnBehavior={{
                particleLifetime:[2000,4000],
                emissionRatePerSecond:[150, 200], 
                emissionBurst:[
                {time:0, min:300, max:350, cycles:1}],
                spawnVolume:{
                  shape:"sphere", 
                  params:[3, 1, 3], 
                  spawnOnSurface:false
                },
                maxParticles:600
              }}

              particleAppearance={{
                opacity:{
                  initialRange:[0, 0.5],
                  factor:"time",
                  interpolation:[
                    {endValue:0.0, interval:[0,500]},
                    {endValue:1.0, interval:[4000,5000]}
                  ]
                },

                scale:{
                  initialRange:[[5,5,5], [10,10,10]],
                  factor:"Time",
                  interpolation:[
                    {endValue:[3,3,3], interval:[0,4000]},
                    {endValue:[0,0,0], interval:[4000,5000]}
                  ]
                },

              }}
              
              particlePhysics={{
                explosiveImpulse:{impulse:0.12 * 8,
                  position:[0,0,0],
                  decelerationPeriod:1.0}
              }}
            />

        </ViroNode>

      		);
  	}
}

module.exports = BombExplosion;