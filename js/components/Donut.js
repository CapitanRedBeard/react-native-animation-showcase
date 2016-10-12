import React, { Component } from 'react';

import fuegoImage from './fuegologo.png';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing
} from 'react-native';

const colors = {
    0: 'rgba(252, 159, 13, 1)',
    50: 'rgba(219, 32, 28, 1)',
    100: 'rgba(159, 5, 17, 1)'
};

module.exports = class Fuego extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.animate()
    }

    animate() {
        Animated.sequence([
            Animated.delay(2000),
            Animated.timing(
                this.state.bg,
                {
                    toValue: 1,
                    duration: 1000
                }),
        ]).start(() => {
            //this.animate();
        });
    }

    particleFactory(num, x, y) {
        let arr = [];
        let count = 360 / num;
        for (var i = 0; i < num; i++) {
            arr.push(i)
        }

        return arr.map((a, i) => {
            let particle = {
                rotate: count * (i + 1),
                left: x,
                top: y,
                offset: i
            };
            return <Particle key={"particle" + i} {...particle}/>
        })
    }

    render() {

        var color = this.state.bg.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(159, 5, 17, 1)', "white"]
        });

        return (

            <Animated.View key="Donut" style={styles.loadingScreen}>
                <View style={styles.container}>
                    {this.particleFactory(36, 50, 50)}

                    {this.particleFactory(80, -20, 100)}

                    {this.particleFactory(23, 30, 0)}
                </View>
            </Animated.View>
        );
    }
};

class Particle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oscillate: new Animated.Value(0),
            pan: new Animated.ValueXY({x: 100, y: -600})
        }
    }

    componentDidMount() {
        //Animated.delay(this.props.delay);
        this.animate();

    }

    animate() {
        Animated.sequence([
                Animated.timing(
                    this.state.pan,
                    {
                        toValue: {x: 100, y: 0},
                        duration: 2000,
                        easing: Easing.bezier(0, 0, 0.8, 1)
                    }
                ),
            Animated.timing(
                this.state.oscillate,
                {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.bezier(0, 0, 0.8, 1)
                })
        ]).start(() => {
            //this.animate();
        });
    }

    render() {

        var bg = this.state.oscillate.interpolate({
            inputRange: [0, 1],
            outputRange: ['red', "purple"]
        });

        var opacity = this.state.oscillate.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        var bgDot = this.state.oscillate.interpolate({
            inputRange: [0, 1],
            outputRange: ['#FFFFFF00', "#FFFFFFFF"]
        });

        var scale = this.state.oscillate.interpolate({
            inputRange: [0, 0.25, 0.50, 0.75, 1],
            outputRange: [0, 0.5, 1, 0.5, 0]
        });

        let offset = this.state.oscillate.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 120]
        });

        let deg = this.props.rotate + "deg";
        //style={{backgroundColor:bg, width: pan, height: 4, transform: [{rotate: deg}]}}>

        return <View
            style={{position: "absolute", left: -200 + this.props.left, top: this.props.top, width: 150, height : 4}}>
            <Animated.View
                style={{backgroundColor: "transparent", width: 150, height: 4, position: "absolute", left: 50, opacity: 1, transform: [this.state.pan.getTranslateTransform(), {rotate: deg}]}}>
                <Animated.View
                    style={{flex: 1, marginLeft: offset, width: 4, height: 4, borderRadius: 2, backgroundColor: bg}}/>
            </Animated.View>
        </View>
    }
}
;

const styles = StyleSheet.create({
    container: {
        height: 200,
        position: "relative",
    },
    fuegoLogo: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 50,
        left: 50,
        width: 100,
        height: 100
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    }
});

