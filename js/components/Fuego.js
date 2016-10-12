import React, { Component } from 'react';
import Flame from './shared/Flame';

import fuegoImage from './fuegologo.png';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated
} from 'react-native';

const colors = {
    0: 'rgba(252, 159, 13, 1)',
    50: 'rgba(219, 32, 28, 1)',
    100: 'rgba(159, 5, 17, 1)'
}


//let circles = {
//    flameFlame1: {
//        radius: 80,
//        styles: {
//            backgroundColor: "transparent",
//            borderColor: "white",
//            borderWidth: 2,
//            left: 30,
//            top: 60
//        },
//        distance: 100,
//        lifetime: 1000,
//        wiggle: {
//            distance: 20,
//            count: 1
//        },
//        loop: false
//    }
//};
module.exports = class Fuego extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bg: new Animated.Value(0),
            fadeOut: new Animated.Value(1)
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
        ]).start( () => {
            //this.animate();
            this.setState({loading: false})
        });
    }

    circleFactory(num) {
        let arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(i)
        }
        return arr.map((a, i) => {
            let rand = Math.random();
            let circle = {
                radius: (rand * 35) + 25,
                styles: {
                    //backgroundColor: "transparent",
                    left: 50 + Math.random() * 60,
                    top: 100 + Math.random() * 20
                },
                distance: (rand * 100) + 50,
                lifetime: 2000,
                wiggle: {
                    distance: 30,
                    count: (rand * 3) + 1
                },
                loop: false

            };

            return <Flame key={"flameFlame" + i} {...circle}/>
        })
    }

    render() {

        var color = this.state.bg.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(159, 5, 17, 1)', "white"]
        });

        let loadingStyles = [styles.loadingScreen, {
            backgroundColor: color,
            opacity: this.state.fadeOut
        }];
        return (
            <Animated.View key="Fuego" style={loadingStyles}>
                <View style={styles.container}>
                    {this.state.loading ? null : this.circleFactory(80)}
                    <Image source={fuegoImage} style={styles.fuegoLogo}/>
                    {this.state.loading ? null : this.circleFactory(10)}

                </View>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: 200,
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

