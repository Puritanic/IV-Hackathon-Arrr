import React, { Component } from 'react';
import {
	ViroImage,
	ViroARImageMarker,
	ViroFlexView,
	ViroNode,
	ViroText,
	ViroARTrackingTargets,
	ViroAnimations,
} from 'react-viro';
import { StyleSheet } from 'react-native';

export class Djuric extends Component {
	state = {
		runAnimation: false,
	};
	_onAnchorFound = () => {
		console.log('%c djuric3: ', 'background: red; color: white');
		this.setState({
			runAnimation: true,
		});
	};

	render() {
		return (
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
						<ViroFlexView rotation={[-90, 0, 0]} height={0.1} width={0.1} style={styles.card}>
							<ViroImage
								height={0.05}
								width={0.06}
								style={styles.image}
								source={require('../res/speak-bubble-zdravo-png.png')}
							/>
						</ViroFlexView>
					</ViroNode>
				</ViroNode>
			</ViroARImageMarker>
		);
	}
}

const styles = StyleSheet.create({
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
		source: require('../res/djuric.png'),
		orientation: 'Up',
		physicalWidth: 0.17,
	},
});

ViroAnimations.registerAnimations({
	animateImage: {
		properties: {
			positionX: 0.055,
			positionY: 0.02,
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

export default Djuric;
