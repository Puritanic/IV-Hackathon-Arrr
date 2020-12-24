/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';

import { ViroARScene, ViroNode, ViroText, ViroQuad, ViroMaterials, ViroConstants } from 'react-viro';

import NatasaMarker from '../markers/natasa';
import MarinaMarker from '../markers/marina';
import DjuricMarker from '../markers/djuric';
import IVLogoMarker from '../markers/logo';

const LoadingComponent = ({ text }) => (
	<ViroText position={[0, 0, -6]} text={text} width={2} height={2} transformBehaviors={['billboard']} />
);

class ARPosterDemo extends Component {
	state = {
		isTracking: false,
		initialized: false,
		runAnimation: false,
	};

	getNoTrackingUI() {
		const { isTracking, initialized } = this.state;
		return <LoadingComponent text={initialized ? 'Initializing AR...' : 'No Tracking'} />;
	}

	getARScene() {
		return (
			<ViroNode>
				<NatasaMarker />
				<MarinaMarker />
				<DjuricMarker />
				<IVLogoMarker />
				<ViroQuad position={[0, 0, 0]} rotation={[-90, 0, 0]} height={10} width={10} arShadowReceiver={true} />
			</ViroNode>
		);
	}
	_onInitialized = (state, reason) => {
		if (state === ViroConstants.TRACKING_NORMAL) {
			this.setState({ isTracking: true });
		} else if (state === ViroConstants.TRACKING_UNAVAILABLE) {
			this.setState({ isTracking: false });
		}
	};

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				{this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
			</ViroARScene>
		);
	}
}

ViroMaterials.createMaterials({
	imagePlaceholder: {
		diffuseColor: 'rgba(255,255,255,1)',
	},
	quad: {
		diffuseColor: 'rgba(0,0,0,0.5)',
	},
});

module.exports = ARPosterDemo;
