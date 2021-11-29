import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated} from 'react-native';
import {Switch} from "react-native-paper";
import Database from "./functions/Database";

function ListItems(props) {

    return (<View>
        {props.clocks.map((key, index) => <View style={styles.innerCont} key={index}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View><Text style={styles.subText}>{key.hour} </Text></View>
                <View><Switch value={key.active === 1} onValueChange={() => {
                    Database.setValue(index + 1, 'active', key.active === 1 ? 0 : 1)
                    props.reload()
                }}/></View>
            </View>
            <View style={{paddingTop: 20, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity style={{width: 30}} onPress={() => props.removeHandleByKey(index + 1)}>
                    <Image source={require('../assets/bin.png')} style={styles.img}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 30}}>
                    <Image source={require('../assets/triangle.png')} style={[styles.img, {

                    }]}/>
                </TouchableOpacity>
            </View>
        </View>)}
    </View>)
}
const styles = StyleSheet.create({
    subText: {
        color: "#fff",
        fontSize: 40,
        fontFamily: "Light",
        padding: 5,

    },
    innerCont: {
        flex: 1,
        width: Dimensions.get("window").width * 0.8,
    },
    img: {
        width: 30,
        height: 30,
        padding: 5,
        resizeMode: 'contain',
    }
});
export default ListItems