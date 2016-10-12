import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native'

const colors = {
    0: 'rgba(252, 159, 13, 0.75)',
    50: 'rgba(219, 32, 28, 0.75)',
    100: 'rgba(159, 5, 17, 0.75)'
}

var Flame = React.createClass({
    getInitialState() {
        return {
            scale: new Animated.Value(1),
            fadeIn: new Animated.Value(0),
            pan: new Animated.ValueXY({x: this.props.styles.left, y: this.props.styles.top})
        }
    },

    fade() {
        return Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: this.props.lifetime / 10
            }
        )
    },

    scale() {
        return Animated.timing(
            this.state.scale,
            {
                toValue: 0,
                duration: this.props.lifetime
            }
        );
    },

    travel() {
        return Animated.timing(
            this.state.pan.y,
            {
                toValue: -this.props.distance,
                duration: this.props.lifetime
            }
        );
    },

    wiggle() {
        let {distance, count} = this.props.wiggle;
        let wiggles = [];
        distance *= Math.round(Math.random()) * 2 - 1;

        for (var i = 0; i < count; i++) {
            wiggles.push(
                Animated.timing(
                    this.state.pan.x,
                    {
                        toValue: this.props.styles.left - distance,
                        duration: this.props.lifetime / (count * 2)
                    }
                )
            );
            wiggles.push(
                Animated.timing(
                    this.state.pan.x,
                    {
                        toValue: this.props.styles.left + (distance / 4),
                        duration: this.props.lifetime / (count * 2)
                    }
                )
            )
        }

        return Animated.sequence(wiggles);
    },

    animate() {
        Animated.sequence([
            Animated.delay(Math.random() * 2000),
            Animated.parallel(
                [
                    this.fade(),
                    this.scale(),
                    this.travel(),
                    this.wiggle()
                ]
            ),
            Animated.delay(200)
        ]).start(()=> {
            if (this.props.loop) {
                this.state.scale.setValue(1);
                this.state.fadeIn.setValue(0);
                this.state.pan.x.setValue(this.props.styles.left);
                this.state.pan.y.setValue(this.props.styles.top);
                this.animate();
            }
        });
    },

    componentDidMount() {
        this.animate();
    },

    render() {
        let radius = this.props.radius;
        var color = this.state.scale.interpolate({
            inputRange: [0.4, 0.8, 1],
            outputRange: [colors[0], colors[50], colors[100]]
        });
        let style = [
            {
                width: radius,
                height: radius,
                borderRadius: radius / 2,
                backgroundColor: color,
                transform: [                            // `transform` is an ordered array
                    {scale: this.state.scale},    // Map `bounceValue` to `scale`
                ]
            },
            styles.circle,
            this.props.styles,
            {
                left: this.state.pan.x,
                top: this.state.pan.y,
                opacity: this.state.fadeIn
            }

        ];

        return (
            <Animated.View style={style}/>
        )
    }
});

var styles = {
    circle: {
        position: "absolute"
    }
};

module.exports = Flame;