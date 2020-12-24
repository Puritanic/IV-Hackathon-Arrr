/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

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

	getARScene = () => {
		return (
			<ViroNode>
				<ViroARImageMarker target={'poster'} onAnchorFound={this._onAnchorFound}>
					<ViroNode key="card" onTouch={() => alert('twitter')}>
						<ViroNode
							opacity={0}
							position={[0, -0.02, 0]}
							animation={{
								name: 'animateImage',
								run: this.state.runAnimation,
							}}
						>
							<ViroFlexView rotation={[-90, 0, 0]} height={0.03} width={0.05} style={styles.card}>
								<ViroFlexView style={styles.cardWrapper}>
									<ViroText
										textClipMode="None"
										width={0.5}
										text="Hello, my name is Nikola"
										scale={[0.015, 0.015, 0.015]}
										style={styles.textStyle}
									/>
								</ViroFlexView>
								<ViroFlexView style={styles.subText}>
									<ViroText
										width={0.04}
										height={0.01}
										textAlign="left"
										textClipMode="None"
										text={`Caossssssss`}
										scale={[0.01, 0.01, 0.01]}
										style={styles.textStyle}
									/>
									<ViroAnimatedImage
										height={0.05}
										width={0.05}
										loop={true}
										source={require('../res/hello.gif')}
									/>
								</ViroFlexView>
							</ViroFlexView>
						</ViroNode>
						<ViroNode
							opacity={0}
							position={[0, 0, 0]}
							animation={{
								name: 'animateViro',
								run: this.state.runAnimation,
							}}
						>
							<ViroText
								text="Simple text"
								rotation={[-90, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								style={styles.textStyle}
							/>
						</ViroNode>
					</ViroNode>
				</ViroARImageMarker>
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
}

var styles = StyleSheet.create({
	textStyle: {
		flex: 0.5,
		fontFamily: 'Roboto',
		fontSize: 30,
		color: '#ffffff',
		textAlignVertical: 'top',
		textAlign: 'left',
		fontWeight: 'bold',
	},
	card: {
		flexDirection: 'column',
	},
	cardWrapper: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 0.001,
		flex: 0.5,
	},
	subText: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flex: 0.5,
	},
});

ViroARTrackingTargets.createTargets({
	poster: {
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
