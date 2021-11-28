import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Font from "expo-font";
import { ActivityIndicator } from 'react-native';

export default function Main(props){

    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        await Font.loadAsync({
            'Bold': require('../assets/fonts/Lato-Bold.ttf'),
            'Regular': require('../assets/fonts/Lato-Regular.ttf'),
            'Light': require('../assets/fonts/Lato-Light.ttf'),
        });
        setLoading(false)
    }, [])

    return(<View style={styles.container}>
        {loading ? <ActivityIndicator /> :
            <View style={styles.innerCont}>
                <TouchableOpacity onPress={() => props.navigation.navigate("clocklist")}>
                    <Text style={styles.titleText}>Sqlite App</Text>
                </TouchableOpacity>
                <Text style={styles.subText}>manage sqlite</Text>
                <Text style={styles.subText}>use animation</Text>
                <Text style={styles.subText}>use ring</Text>
            </View>
        }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#9050FF",
    },
    innerCont: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: "#fff",
        fontSize: 48,
        fontFamily: "Light",
        padding: 10,
    },
    subText: {
        color: "#fff",
        fontSize: 32,
        fontFamily: "Light",
        padding: 5,
    }
});