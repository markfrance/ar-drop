/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * React Native CLI configuration file
 */
'use strict';

const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetRoots() {
    return this._getRoots();
  },

  getAssetExts() {
    return ["obj", "mtl", "png", "JPG", "vrx", "hdr", "gltf", "glb", "bin", "arobject", "mp3"];
  },

  _getRoots() {
    // match on either path separator
    if (__dirname.match(/node_modules[\/\\]react-native[\/\\]packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else if (__dirname.match(/Pods\/React\/packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else {
      return [path.resolve(__dirname, '.')];
    }
  },

};
