import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import FireworkEmitter from '../FireworkEmitter.js';

import {
  ViroSceneNavigator,
  ViroAnimatedImage,
  ViroARPlaneSelector,
  ViroScene,
  ViroARScene,
  ViroAmbientLight,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroMaterials,
  ViroPolygon,
  ViroNode
} from 'react-viro';

export default class PortalScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pauseUpdates: false
    };

    this._renderCoins = this._renderCoins.bind(this);
    this._getPostProcessingEffects = this._getPostProcessingEffects.bind(this);
  }

  _renderCoins(amount) {
    let coinModels = [];

    for(let i=0; i<amount; i++) {

      coinModels.push(
         <ViroAnimatedImage
            source={require('../../public/images/BTC-Spinning_small.gif')} 
            scale={[.5, .5, .5]} 
            ref={"coin" + i}
            position={[(Math.random() * 10) - 5, 
              0,
              (Math.random() * 10) - 5]}
            onClick={()=>{this.props.sceneNavigator.viroAppProps.collectCoin()}}
          />
          );
    }
    return coinModels;
  }

  _getPostProcessingEffects() {
    if(this.props.sceneNavigator.viroAppProps.enableThermal)
      return "thermalvision";
    else
      return "";
  }

  render() {
    let coinModels = this._renderCoins(10);

    return (
      <ViroARScene anchorDetectionTypes={['PlanesHorizontal']}
      postProcessEffects={[this._getPostProcessingEffects()]}
      dragType="FixedToWorld" onDrag={()=>{}} >
        <ViroAmbientLight color="#ffffff" intensity={200}/>
       
        <ViroARPlaneSelector minHeight={.1} minWidth={.1}
            alignment="HorizontalUpward"
            onPlaneSelected={()=>{this.setState({pauseUpdates : true})}}
            pauseUpdates={this.state.pauseUpdates}>
          <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
            <ViroPortal position={[0, 0, 0]} 
            scale={[.5, .5, .5]} rotation={[0,0, 0]}
            dragType="FixedToWorld" onDrag={()=>{}}  >
              <Viro3DObject source={require('../../public/models/portal_ship/portal_ship.vrx')}
                resources={[require('../../public/models/portal_ship/portal_ship_diffuse.png'),
                            require('../../public/models/portal_ship/portal_ship_normal.png'),
                            require('../../public/models/portal_ship/portal_ship_specular.png')]}
                type="VRX"/>
            </ViroPortal>

            <Viro360Video source={require("../../public/videos/space_v2_1k.mp4")}
            paused={false} loop={true} />
             {coinModels}
             <ViroPolygon rotation={[-90, 0, 0]}
             position={[0,-10,0]}
             vertices={[[-1000,0], [0,1000], [1000,0], [0, -1000]]}
             materials={"floor"}
             dragType="FixedToWorld" onDrag={()=>{}} />
          </ViroPortalScene>
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}

ViroMaterials.createMaterials({
  floor: {
    shininess: 2.0,
    blendMode: "Alpha",
    lightingModel: "Lambert",
    diffuseTexture: require('../../public/images/floor_top_v1.png'),
  }
});

module.exports = PortalScene;
