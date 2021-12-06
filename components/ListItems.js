import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated} from 'react-native';
import {Switch} from "react-native-paper";
import Database from "./functions/Database";

const Item = (props) => {
    const [visible] = useState(new Animated.Value(1))
    const [val, setVal] = useState(false)
    const RotateInterpolate = visible.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    })
    const HeightInterpolate = visible.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const weeksDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    return (
        <View style={styles.innerCont}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View><Text style={styles.subText}>{props.el.hour} </Text></View>
                <View><Switch value={props.el.active === 1} onValueChange={() => {
                    Database.setValue(props.el.id, 'active', props.el.active === 1 ? 0 : 1)
                    props.reload()
                }}/></View>
            </View>
            <View style={{paddingTop: 20, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity style={{width: 30}} onPress={() => props.removeHandleByKey(props.el.id)}>
                    <Image source={require('../assets/bin.png')} style={styles.img}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 30}} onPress={() => {
                    Animated.timing(visible, {
                        toValue: val ? 1 : 0,
                        duration: 100,
                        useNativeDriver: true
                    }).start()
                    setVal(!val)
                }}>
                    <Animated.Image source={require('../assets/triangle.png')} style={[styles.img, {
                        transform: [{rotateX: RotateInterpolate}]
                    }]}/>
                </TouchableOpacity>
            </View>
            {!val ? <Animated.View style={{
                transform: [{scale: HeightInterpolate}],
                height: 50,
                marginTop: 20,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: "space-around"
            }}>
                {weeksDay.map((e, i) => <View key={i}>
                    <TouchableOpacity onPress={() => {
                        Database.setValue(props.el.id, e, props.el[e] === 1 ? 0 : 1)
                        props.reload()
                    }}>
                        <Text style={[styles.miniText, {
                            backgroundColor: props.el[e] === 1 ? "green" : "transparent"
                        }]}>{e.substring(0, 2)}</Text>
                    </TouchableOpacity>
                </View>)}
            </Animated.View> : null}
        </View>
    )
}

function ListItems(props) {
    return (<View>
        {props.clocks.map((key, index) => <Item el={key} index={index} key={index} {...props}/>)}
    </View>)
}

const styles = StyleSheet.create({
    subText: {
        color: "#fff",
        fontSize: 40,
        fontFamily: "Light",
        padding: 5,

    },
    miniText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Light",
        padding: 5,

    },
    innerCont: {
        flex: 1,
        width: Dimensions.get("window").width * 0.8,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#DD10DD"
    },
    img: {
        width: 30,
        height: 30,
        padding: 5,
        resizeMode: 'contain',
    }
});
export default ListItems