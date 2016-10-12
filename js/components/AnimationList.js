import React, {Component} from 'react';
import Fuego from './Fuego';
import Checkmark from './shared/Checkmark';
import SubmitButton from './buttons/SubmitButton'
import Donut from './Donut'
import TimingFunctions from './TimingFunctions'
import DragSquare from './DragSquare'
import Stagger from './Stagger'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    ListView,
    Image,
    NavigatorIOS
} from 'react-native';

const animationList = [
    {
        component: Fuego,
        name: "Fuego",
        color: "rgba(159, 5, 17, 1)",
        bgColor: "rgba(219, 32, 28, 1)"
    },

    {
        component: SubmitButton,
        name: "SubmitButton",
        bgColor: "#1ECD97",
        color: "white"
    },

    {
        component: Donut,
        name: "Donut",
        bgColor: "#B6A6CA",
        color: "#E1DEE9"
    },
    {
        component: TimingFunctions,
        name: "TimingFunctions",
        bgColor: "#4285F4",
        color: "white"
    },
    {
        component: DragSquare,
        name: "DragSquare",
        color: 'rgba(229,27,66,1)',
        bgColor: 'white'
    },

    {
        component: Stagger,
        name: "Rainbow Stagger",
        bgColor: "#FF5F3C",
        color: "white"
    },
];

class AnimationList extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(animationList)
        };

    }

    renderRow(rowData, sectionID, rowID) {
        //var component = rowData.resource.fields;
        console.log("Data", rowData, sectionID, rowID);
        const {component, name, color, bgColor} = rowData;
        let backgroundColor = [styles.rowWrapper, {backgroundColor: bgColor}];
        let textColor = [styles.name, {color: color}];
        return (
            <TouchableHighlight key={rowID} underlayColor='#666666' style={backgroundColor}
                                onPress={() => {
                                                    this.props.navigator.push({
                                                        title: name,
                                                        component: component
                                                    });
                                                }}>
                <Text style={textColor}>{name}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    rowWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        flex: 1
    },
    name: {
        fontSize: 32,

    }
});

module.exports = AnimationList;