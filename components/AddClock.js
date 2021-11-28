import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import Database from "./functions/Database";
export default function AddClock(props){
    return(<View style={styles.cont}>
        <Text style={styles.subText}>"+" dodaje do bazy budzik z godziną 00:00</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {
            props.addHandle
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
    subText: {
        color: "#fff",
        fontSize: 32,
        fontFamily: "Light",
        padding: 5,

    },
    addButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#902040",
        position: "absolute",
        top: Dimensions.get("window").height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    }
});