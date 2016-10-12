/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Stagger from './js/components/Stagger';
import Fuego from './js/components/Fuego';
import ShinyButton from './js/components/buttons/ShinyButton';

import AnimationList from './js/components/AnimationList'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} from 'react-native';

class AnimationSandBox extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{title: 'Animations', component: AnimationList}}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

AppRegistry.registerComponent('AnimationSandBox', () => AnimationSandBox);
