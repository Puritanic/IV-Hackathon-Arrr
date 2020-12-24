import React, { Component } from 'react';
import { ViroAnimatedImage, ViroARImageMarker, ViroFlexView, ViroNode, ViroText } from 'react-viro';
import { StyleSheet } from 'react-native';

export class NikolaMarker extends Component {
	render() {
		return (
			<ViroARImageMarker target={'nikola'} onAnchorFound={this.props.onAnchorFound}>
				<ViroNode key="card" onTouch={() => alert('twitter')}>
					<ViroNode
						opacity={0}
						position={[0, -0.02, 0]}
						animation={{
							name: 'animateImage',
							run: this.props.runAnimation,
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
							run: this.props.runAnimation,
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

export default NikolaMarker;
