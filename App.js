/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ReactNativeSensors, {Accelerometer} from 'react-native-sensors';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TEXT: "HERE"
        };

        let accelerationObservable;

        new Accelerometer({
            updateInterval: 100, // defaults to 100ms
        }).then((result) => {
            accelerationObservable = result;
            accelerationObservable
                .map(({x, y, z}) => x + y + z)
                .filter(speed => speed > 0)
                .subscribe(speed => this.setState({TEXT: speed}));
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                    {this.state.TEXT}
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    });
