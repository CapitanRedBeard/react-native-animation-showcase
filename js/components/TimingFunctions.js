import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Picker,
    PickerIOS
} from 'react-native'

const FUNCTYPES = ["timing", "spring", "decay"];

class Stagger extends Component {

    constructor() {
        super();
        this.animatedValue = [];
        for (var i = 0; i < 50; i++) {
            this.animatedValue.push(new Animated.ValueXY({x: 0, y: 200}));
        }
        this.loopCount = 0;
        this.state = {
            funcType: "spring;"
        }
    }

    runThru(delay, funcType, callback, args) {
        this._onValueChange(funcType);
        setTimeout(() => {
            callback && callback({...args});
        }, delay);
    }

    componentDidMount() {
        //this.runThru(2000, FUNCTYPES[0], this.runThru(2000, FUNCTYPES[1], this.runThru(2000, FUNCTYPES[2])));

            //setInterval(() => {
            //    this._onValueChange(FUNCTYPES[this.loopCount++ % 3]);
            //}, 2000);

    }

    _onValueChange(funcType) {
        let timingFunction, parameters;
        if (funcType == FUNCTYPES[1]) {
            timingFunction = Animated.spring;
            parameters = {
                toValue: {x: 0, y: 450},
                //overshootClamping: true,
                velocity: 2,
                //bounciness: 5,
                speed: 1
            };
        }
        else if (funcType == FUNCTYPES[2]) {
            timingFunction = Animated.decay;
            parameters = {
                velocity: {x: 0, y: 0.75},
                deceleration: 0.997
            }
        }
        else {
            timingFunction = Animated.timing;
            parameters = {
                toValue: {x: 0, y: 450},
                duration: 500
            };

        }
        this.setState({funcType: funcType}, () => {
            this.animate(timingFunction, parameters)
        });
    }

    animate(timingFunction, parameters) {
        const animations = this.animatedValue.map((item) => {
            item.setValue({x: 0, y: 200});
            return timingFunction(
                item,
                parameters
            )
        });
        console.log("animations", animations);
        Animated.stagger(10, animations).start();
    }

    render() {

        const animationComponents = this.animatedValue.map((item, i) => {
            //let top = item.interpolate({
            //    inputRange: [0, 1],
            //    outputRange: [200, 450]
            //});
            let circleStyles = [styles.circle, {transform: item.getTranslateTransform(), opacity: 1 / i}];

            return <Animated.View key={i}
                                  style={circleStyles}/>
        });
        return (
            <View style={styles.container}>
                <PickerIOS
                    itemStyle={styles.picker}
                    selectedValue={this.state.funcType}
                    onValueChange={(funcType) => this._onValueChange(funcType)}>
                    <PickerIOS.Item label="Timing" value={FUNCTYPES[0]}/>
                    <PickerIOS.Item label="Spring" value={FUNCTYPES[1]}/>
                    <PickerIOS.Item label="Decay" value={FUNCTYPES[2]}/>
                </PickerIOS>
                {animationComponents}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        alignSelf: "flex-end",
        flex: 1,
        width: 300,
        fontSize: 25,
        borderColor: "#4285F4",
        color: "white",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        height: 200,
        backgroundColor: "#4285F4"
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        position: "absolute",
        left: 185,
        top: 0
    }
})

AppRegistry.registerComponent('Stagger', () => Stagger);
module.exports = Stagger;