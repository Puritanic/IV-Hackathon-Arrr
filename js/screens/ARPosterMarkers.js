/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';

import {
	ViroARScene,
	ViroNode,
	ViroARTrackingTargets,
	ViroARImageMarker,
	ViroAnimations,
	ViroDirectionalLight,
	ViroText,
	ViroFlexView,
	ViroImage,
	ViroAnimatedImage,
	ViroQuad,
	ViroMaterials,
	ViroConstants,
} from 'react-viro';

import NatasaMarker from '../markers/natasa';
import MarinaMarker from '../markers/marina';

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

	_onInitialized = (state, reason) => {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({ isTracking: true });
		} else if (state == ViroConstants.TRACKING_UNAVAILABLE) {
			this.setState({ isTracking: false });
		}
	};

	getARScene = () => {
		return (
			<ViroNode>
				<NatasaMarker />
				<MarinaMarker />
				<ViroQuad position={[0, 0, 0]} rotation={[-90, 0, 0]} height={10} width={10} arShadowReceiver={true} />
			</ViroNode>
		);
	};
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
