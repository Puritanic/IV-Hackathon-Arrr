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

export class MarinaMarker extends Component {
	state = {
		runAnimation: false
	}
	_onAnchorFound = () => {
		console.log('%c marina: ', 'background: red; color: white');
		setTimeout(() => {
			this.setState({
				runAnimation: true,
			});
		}, 1500);
	};

	render() {
		return (
			<ViroARImageMarker target={'marina'} onAnchorFound={this._onAnchorFound}>
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
							<ViroImage
								height={0.015}
								width={0.015}
								style={styles.image}
								source={require('../res/marina_info.jpg')}
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
	marina: {
		source: require('../res/marina.jpg'),
		orientation: 'Up',
		physicalWidth: 0.1,
	},
});

ViroAnimations.registerAnimations({
	animateImage:{
		properties:{
			positionX: 0.055,
			positionY: 0.02,
			opacity: 1.0
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

export default MarinaMarker;
