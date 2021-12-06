import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, LogBox, Vibration} from 'react-native';
import Database from "./functions/Database";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function AddClock(props) {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [toggle, setToggle] = useState('hours')
    useEffect(() => {
        Vibration.vibrate(100)
    }, [hours, minutes])
    return (<View style={styles.cont}>
        <View style={styles.timeCont}>
            <TouchableOpacity onPress={() => setToggle('hours')}>
                <Text
                    style={toggle === 'hours' ? styles.subToggleText : styles.subText}>{hours < 10 ? '0' : null}{hours}</Text>
            </TouchableOpacity>
            <Text style={styles.subText}>:</Text>
            <TouchableOpacity onPress={() => setToggle('minutes')}>
                <Text
                    style={toggle === 'minutes' ? styles.subToggleText : styles.subText}>{minutes < 10 ? '0' : null}{minutes}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.timersClock}>
            {/* godziny 0-11 albo minuty 0-55*/}
            {[...Array(12)].map((value, index) => <View key={index} style={[styles.element,
                {
                    transform: [
                        {translateX: `${140 * Math.cos((index - 3) * 0.524)}`},
                        {translateY: `${140 * Math.sin((index - 3) * 0.524)}`},
                    ]
                }
            ]}>
                <TouchableOpacity style={styles.element} onPress={() => {
                    toggle === 'hours' ? setHours(index) : setMinutes(index * 5)
                }}>
                    <Text style={{fontSize: 30, color: 'white'}}>{toggle === 'hours' ? index : index * 5}</Text>
                </TouchableOpacity>
            </View>)}
            {/* godziny 12-23 */}
            {toggle === 'hours' ? ([...Array(12)].map((value, index) => <View key={index} style={[styles.element,
                {
                    transform: [
                        {translateX: `${80 * Math.cos((index - 3) * 0.524)}`},
                        {translateY: `${80 * Math.sin((index - 3) * 0.524)}`},
                        {scale: 0.65}
                    ],
                }
            ]}>
                <TouchableOpacity style={[styles.element, {backgroundColor: '#303030'}]} onPress={() => {
                   setHours(index + 12)
                }}>
                    <Text style={{fontSize: 30, color: 'white'}}>{index + 12}</Text>
                </TouchableOpacity>
            </View>)) : null}
        </View>
        <View style={{flex: 1.5}}/>
        <TouchableOpacity style={styles.addButton} onPress={() => {
            props.route.params.addHandle(`${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`)
            props.navigation.pop()
        }}>
            <View>
                <Image style={styles.img} source={require('../assets/plus.png')}/>
            </View>
        </TouchableOpacity>
    </View>)
}
const styles = StyleSheet.create({
    cont: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: '#9070FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    timeCont: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
    },
    timersClock: {
        flex: 4,
        justifyContent: "center",
        alignItems: 'center',
        width: Dimensions.get("window").width * 0.9
    },
    subToggleText: {
        color: "#b04040",
        fontSize: 64,
        fontFamily: "Light",
        padding: 5,
    },
    subText: {
        color: "#fff",
        fontSize: 60,
        fontFamily: "Light",
        padding: 5,
    },
    addButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#C71585",
        position: "absolute",
        top: Dimensions.get("window").height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    element: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: "#000000",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

});