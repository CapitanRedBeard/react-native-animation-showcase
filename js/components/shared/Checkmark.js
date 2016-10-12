import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
Easing
} from 'react-native'

var Checkmark = React.createClass({
    getInitialState() {
        return {
            stretch: new Animated.Value(0)
        }
    },

    animate() {
        Animated.timing(
            this.state.stretch,
            {
                toValue: 1,
                duration: this.props.duration,
                ease: Easing.in()
            }
        ).start();
    },

    componentDidMount() {
        this.animate();
    },

    render() {
        var stretchLong = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 12]
        });

        var stretchShort = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 24]
        });

        var fadeIn = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        let styleShort = [
            {
                width: 4,
                height: stretchShort,
                borderRadius: 2,
                backgroundColor: "white",
                transform: [                            // `transform` is an ordered array
                    {rotate: '0deg'}
                ],
                opacity: fadeIn
            },
            styles.checkmarkShort
        ];

        let styleLong = [
            {
                width: stretchLong,
                height: 4,
                borderRadius: 2,
                backgroundColor: "white",
                transform: [                            // `transform` is an ordered array
                    {rotate: '0deg'}
                ],
                opacity: fadeIn
            },
            styles.checkmarkLong
        ];

        return (

                <View style={styles.wrapper}>
                    <Animated.View key="styleShort" style={styleShort}/>
                    <Animated.View key="styleLong" style={styleLong}/>
                </View>
        )
    }
});

var styles = {
    wrapper: {
        //borderColor: "red",
        //borderWidth: 1,
        width: 30,
        height: 30,
        transform: [                            // `transform` is an ordered array
            {rotate: '-140deg'}
        ]
    },
    checkmarkShort: {
        position: "absolute",
        top: 0,
        left: 0
    },

    checkmarkLong: {
        position: "absolute",
        top: 0,
        left: 0
    }
};

module.exports = Checkmark;