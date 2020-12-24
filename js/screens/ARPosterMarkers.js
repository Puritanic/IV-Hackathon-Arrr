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
import NikolaMarker from '../markers/Nikola';

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
				<NikolaMarker onAnchorFound={this._onAnchorFound} runAnimation={this.state.runAnimation} />
				<ViroQuad position={[0, 0, 0]} rotation={[-90, 0, 0]} height={10} width={10} arShadowReceiver={true} />
			</ViroNode>
		);
	};

	_onAnchorFound = (anchor) => {
		console.log('%c ARPosterDemo _onAnchorFound: ', 'background: red; color: white');
		setTimeout(() => {
			this.setState({
				runAnimation: true,
			});
		}, 1500);
	};

	_onAnchorRemoved = (anchor) => {
		setTimeout(() => {
			this.setState({
				runAnimation: false,
			});
		}, 1500);
	};

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight
					color="#777777"
					direction={[0, -1, -2]}
					shadowOrthographicPosition={[0, 8, -5]}
					shadowOrthographicSize={10}
					shadowNearZ={2}
					shadowFarZ={9}
					lightInfluenceBitMask={2}
					castsShadow={true}
				/>
				{!this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
			</ViroARScene>
		);
	}
}

ViroARTrackingTargets.createTargets({
	nikola: {
		source: require('../res/nikola.png'),
		orientation: 'Up',
		physicalWidth: 0.06,
	},
});

ViroAnimations.registerAnimations({
	animateImage: {
		properties: {
			positionX: 0.05,
			opacity: 1.0,
		},
		easing: 'Bounce',
		duration: 500,
	},
	animateViro: {
		properties: {
			positionZ: 0.1,
			opacity: 1.0,
		},
		easing: 'Bounce',
		duration: 500,
	},
});

ViroMaterials.createMaterials({
	imagePlaceholder: {
		diffuseColor: 'rgba(255,255,255,1)',
	},
	quad: {
		diffuseColor: 'rgba(0,0,0,0.5)',
	},
});

module.exports = ARPosterDemo;
