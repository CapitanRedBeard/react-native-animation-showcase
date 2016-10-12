import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native'

const arr = []
for (var i = 0; i < 576; i++) {
    arr.push(i)
}

class Stagger extends Component {

    constructor() {
        super()
        this.animatedValue = []
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0)
        })
    }

    componentDidMount() {
        this.animate()
    }

    animate() {
        const animations = arr.map((item) => {
            return Animated.sequence([
                Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: 8000
                    }
                ),
                Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 0,
                        duration: 8000
                    }
                )
            ])
        });
        Animated.stagger(5, animations).start()
    }

    render() {
        const animations = arr.map((a, i) => {
            var bg = this.animatedValue[a].interpolate({
                inputRange: [0, 0.15, 0.3, 0.48, 0.64, 0.82, 1],
                outputRange: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8f00ff"]
            });

            var opacity = this.animatedValue[a].interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0, 0.5, 1]
            });

            return <Animated.View key={i}
                                  style={{opacity: opacity, height: 20, width: 20, backgroundColor: bg, marginLeft: 3, marginTop: 3}}/>
        })
        return (
            <View style={styles.container}>
                {animations}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

module.exports = Stagger;