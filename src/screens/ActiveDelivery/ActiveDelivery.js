import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import ActiveDeliveryMap from './ActiveDeliveryMap'
import ActiveDeliveryOption from './ActiveDeliveryOption'

import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActiveDelivery = (props) => {
    const navigation = useNavigation();
    console.log("props__ActiveDelivery", props);
    // const { item } = props.route.params

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:Color.StatusBarColor }}>
            {/* header ....... */}
            <View style={{ backgroundColor: Color.TheamCard, width: '100%', height: '7%', paddingTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>

                <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Active Delivery
                    </Text>
                </View>

                <View style={{ width: '10%', height: '100%' }}></View>
            </View>

            <View style={styles.authView}>
                <View style={{ width: '100%', }}><ActiveDeliveryMap /></View>
                <View style={{ position: 'absolute', bottom: '5%', width: '100%', }}><ActiveDeliveryOption /></View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    authView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: Color.TheamBlack
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    textStyle: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        color: Color.White
    },
    container: {
        flex: 1,
        backgroundColor: Color.TheamBlack,
        paddingBottom: 5,
        alignItems: 'center',
    },
    TabContainer: {
        position: 'absolute',
        bottom: '13%',
        width: '98%',
        marginBottom: 10,
        flexDirection: 'row',
    },
    tabText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
    tabView: {
        padding: 15,
        justifyContent: 'center',
        flex: 0.5,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 2
    },
    touchableStyle: {
        width: '98%',
        height: windowWidth * 0.29,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Color.TheamCard,
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: Color.White,
        // shadowOffset: { width: 56, height: 13 },
        // shadowRadius: 15,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White
    },
    orderText: {
        fontWeight: 'bold',
        color: Color.White,
        marginTop: 10
    },
    AddressText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: Color.White
    },
    priceText: {
        color: Color.White,
        fontWeight: 'bold'
    },
    mainViewStyle: {
        flexDirection: 'row',
        width: '100%',
    },
    firestViewStyle: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondViewStyle: {
        width: '60%'
    },
    thirdViewStyle: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    iconStyle: {
        marginTop: 5
    }
})

export default ActiveDelivery;