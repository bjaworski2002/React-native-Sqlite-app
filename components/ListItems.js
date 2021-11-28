import React from 'react';
import {View, Text} from 'react-native';
export default function ListItems(props){
    return(<View>
        {props.clocks.map((key, index) => <View>
            <Text>{JSON.stringify(key)}</Text>
        </View>)}
    </View>)
}