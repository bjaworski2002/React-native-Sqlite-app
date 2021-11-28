import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from "expo-font";

import Main from "./components/Main"
import ClockList from "./components/ClockList";
const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(async () => {
        await Font.loadAsync({
            'Bold': require('./assets/fonts/Lato-Bold.ttf'),
            'Regular': require('./assets/fonts/Lato-Regular.ttf'),
            'Light': require('./assets/fonts/Lato-Light.ttf'),
        });
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="main" component={Main} options={{headerShown: false}}/>
                <Stack.Screen name="clocklist" component={ClockList} options={{
                    title: "Lista Budzików",
                    headerStyle: {
                        backgroundColor: "#9050FF",
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Regular'
                    },
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
