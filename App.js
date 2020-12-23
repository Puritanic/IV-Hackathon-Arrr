import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, PixelRatio, TouchableHighlight } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = { apiKey: 'API_KEY_HERE' };

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');
var UNSET = 'UNSET';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
	constructor() {
		super();

		this.state = {
			navigatorType: defaultNavigatorType,
			sharedProps: sharedProps,
		};
		this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
		this._exitViro = this._exitViro.bind(this);
	}

	render() {
		return <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{ scene: InitialARScene }} />;
	}

	// This function returns an anonymous/lambda function to be used
	// by the experience selector buttons
	_getExperienceButtonOnPress(navigatorType) {
		return () => {
			this.setState({
				navigatorType: navigatorType,
			});
		};
	}

	// This function "exits" Viro by setting the navigatorType to UNSET.
	_exitViro() {
		this.setState({
			navigatorType: UNSET,
		});
	}
}

module.exports = ViroSample;
