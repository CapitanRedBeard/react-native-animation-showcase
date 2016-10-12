import React, { Component } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Checkmark from '../shared/Checkmark';


import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableHighlight,
} from 'react-native'

//REFERENCE http://codepen.io/aundrekerr/pen/GtLul

const SubmitButton = React.createClass({

    getInitialState() {
        this.animating = false;

        return {
            progress: false,
            color: new Animated.Value(0),
            textScale: new Animated.Value(1),
            textFade: new Animated.Value(1),
            buttonSize: new Animated.Value(0),
            buttonFade: new Animated.Value(1),
            animateCheck: false
        };
    },

    componentDidMount() {
    },

    textAnimations() {
        return Animated.sequence([
            Animated.timing(
                this.state.color,
                {
                    toValue: 1,
                    duration: 300
                }
            ),
            Animated.timing(
                this.state.textScale,
                {
                    toValue: 1.05,
                    duration: 100
                }
            ),
            Animated.timing(
                this.state.textScale,
                {
                    toValue: 1,
                    duration: 100
                }
            ),
            Animated.timing(
                this.state.textFade,
                {
                    toValue: 0,
                    duration: 300
                }
            )
        ]);

    },

    buttonAnimations(direction) {
        return Animated.parallel([
            Animated.timing(
                this.state.buttonSize,
                {
                    toValue: +direction,
                    duration: 300
                }
            ),
            Animated.timing(
                this.state.color,
                {
                    toValue: +!direction,
                    duration: 300
                }
            )]);

    },

    onSubmit() {
        if (!this.animating) {
            this.animating = true;

            Animated.sequence([
                this.textAnimations(),
                this.buttonAnimations(true),
            ]).start(() => {
                this.animating = false;
                this.setState({progress: true});
                //this.state.color.setValue(0);
                //this.state.textScale.setValue(1);
                //this.state.textFade.setValue(1);
                //this.state.buttonSize.setValue(0);
            });

            setTimeout(() => {
                this.setState({progress: false, animateCheck: true}, () => {
                    this.buttonAnimations(false).start();
                });
            }, 3000);
        }

    },

    render() {

        let color = this.state.color.interpolate({
            inputRange: [0, 1],
            outputRange: ["#1ECD97", "white"]
        });

        let bgColor = this.state.color.interpolate({
            inputRange: [0, 1],
            outputRange: ["white", "#1ECD97"]
        });

        let borderColor = this.state.buttonSize.interpolate({
            inputRange: [0, 1],
            outputRange: ["#1ECD97", "#BBBBBB"]
        });

        let borderWidth = this.state.buttonSize.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 4]
        });

        let buttonWidth = this.state.buttonSize.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 50]
        });

        let containerStyle = [styles.container, {
            backgroundColor: bgColor,
            borderColor: borderColor,
            width: buttonWidth,
            borderWidth: borderWidth
        }];
        let textStyle = [styles.text, {
            color: color,
            transform: [
                {scale: this.state.textScale}
            ],
            opacity: this.state.textFade
        }];
        let wrapper = {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        };

        let buttonWrapper = {
            width: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center"
        };

        //let {shinePan, fadeInOut} = this.state;
        //let animatedStyle = {transform: {rotate: '30deg', translateY: shinePan.y, translateX: shinePan.x}, opacity: fadeInOut};
        //animatedStyle = [styles.shine, animatedStyle];
        //let shine = <Animated.View style={animatedStyle}></Animated.View>
        let check = this.state.animateCheck ? <View style={{width: 30, height: 30, position: "absolute", top: 0, left: 80}}>
                <Checkmark duration={400}/>
            </View> : null;
        let content = (!this.state.progress ? <Animated.View style={containerStyle}>
            <Animated.Text
                style={textStyle}>
                Submit
            </Animated.Text>
        </Animated.View> :
            <View style={{position: "absolute", top: 0, left: 75}}>
                <AnimatedCircularProgress
                    size={50}
                    width={4}
                    fill={100}
                    tintColor="#1ECD97"
                    rotation={0}
                    tension={5}
                    backgroundColor="#BBBBBB"/>
            </View>);
        return (
            <Animated.View key="Submit Button" style={wrapper}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={this.onSubmit}>
                    <View style={buttonWrapper}>
                        {content}
                        {check}
                    </View>

                </TouchableHighlight>
            </Animated.View>);
    }
});

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        margin: 25,

    },
    text: {
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'Futura'
    }
});

module.exports = SubmitButton;