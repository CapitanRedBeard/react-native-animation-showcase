import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableHighlight
} from 'react-native'
//REFERENCE http://codepen.io/aundrekerr/pen/GtLul

class ShinyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shinePan: new Animated.ValueXY({x: -30, y: 0}), // instantiate the translate animation variable
            fadeInOut: new Animated.Value(.5)
        };
    }

    componentDidMount() {
        //Animated.parallel([
        //    Animated.timing(
        //        this.state.shinePan,
        //        {
        //            toValue: {x: 30, y: 0},
        //            duration: 300
        //        }
        //    ),
        //    Animated.sequence(
        //        Animated.timing(
        //            this.state.fadeInOut,
        //            {
        //                toValue: 1,
        //                duration: 150
        //            }
        //        ),
        //        Animated.timing(
        //            this.state.fadeInOut,
        //            {
        //                toValue: 0.5,
        //                duration: 150
        //            }
        //        )
        //    )
        //]).start();
    }

    render() {
        let style = [styles.container, {backgroundColor: this.props.bgColor}];
        let text = this.props.text;
        //
        //let {shinePan, fadeInOut} = this.state;
        //let animatedStyle = {transform: {rotate: '30deg', translateY: shinePan.y, translateX: shinePan.x}, opacity: fadeInOut};
        //animatedStyle = [styles.shine, animatedStyle];
        //let shine = <Animated.View style={animatedStyle}></Animated.View>

        return (
            <TouchableHighlight style={style}>
                <View>
                    {text}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(8,97,76,0.6)",
        borderColor: "#FAFAFA",
        borderWidth: 3,
        padding: 25,
        margin: 25,
        color: "#FAFAFA"
    },
    shine: {
        position: "absolute",
        flex: 1,
        width: 30,
        backgroundColor: "#FAFAFA"
    }
});

AppRegistry.registerComponent('ShinyButton', () => ShinyButton);
module.exports = ShinyButton;