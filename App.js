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
const GRAVITY = 9;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TEXT: "HERE22",
            PAST: []
        };

        new Accelerometer({
            updateInterval: 100, // defaults to 100ms
        }).then((result) => {
            console.dir(result);

            result
                .map(({x, y, z}) => {
                    return [x.toFixed(2), y.toFixed(2), z.toFixed(2), (new Date).getTime(), Math.abs(parseInt(x)) + Math.abs(parseInt(y)) + Math.abs(parseInt(z)) - GRAVITY]
                }, [])
                .subscribe(location => {
                    console.log("HERE");
                        let speed = location[4];
                        let past = this.state['PAST'];

                        if (past.length > 29) {
                            past.splice(0, 1);
                        }

                        past.push(location);

                        let sum = 0, times = 0;
                        if (past.length > 5) {
                            times = 0;
                            for (let i = past.length - 5; i < past.length; i++) {
                                sum += past[i][4];
                                times++;
                            }
                        }

                        this.setState({TEXT: location.join(" ") + " SPEED: " + speed + " SUM: " + sum + " TIMES: " + times});
                    }
                );
        }).catch((error) => {
            console.log("ERROR:");
            console.dir(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.TEXT}
                    {this.state.SHAKE}
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
