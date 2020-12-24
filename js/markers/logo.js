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
import { StyleSheet, Linking } from 'react-native';

export class Logo extends Component {
	state = { runAnimation: false };

	_onAnchorFound = () => {
		this.setState({ runAnimation: true });
	};

	onClick = () => {
		Linking.openURL('https://sites.google.com/interventure.info/ivhackathon2020/timovi');
	};

	render() {
		return (
			<ViroARImageMarker target={'poster'} onAnchorFound={this._onAnchorFound}>
				<ViroNode key="card">
					<ViroNode
						opacity={0}
						position={[0, -0.02, 0]}
						animation={{
							name: 'animateImage',
							run: this.state.runAnimation,
						}}
					>
						<ViroFlexView rotation={[-90, 0, 0]} height={0.03} width={0.05} style={styles.card}>
							<ViroImage
								height={0.1}
								width={0.1}
								style={styles.image}
								source={require('../res/hackathon_img.png')}
								onClick={this.onClick}
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
	image: {},
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
		source: require('../res/hackaton.jpg'),
		orientation: 'Up',
		physicalWidth: 0.1,
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

export default Logo;
