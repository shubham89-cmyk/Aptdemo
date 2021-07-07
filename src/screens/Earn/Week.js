import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView
} from "react-native";
import { Color } from '../../helper';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Week = (props) => {
    console.log("props__Week", props);
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.mainViewStyle}>
                <View style={styles.dateViewStyle}>
                    <Text style={styles.dateTextStyle}>3rd Week</Text>
                    <Text style={styles.rupeeTextStyle}>{'\u20B9'} 2000</Text>
                </View>

                <View style={styles.tripViewStyle}>
                    <Text style={styles.tripTextView}>Trip Earning</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Service Price</Text>
                        <Text style={styles.servicePriceStyle}>452.02</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Tax Price</Text>
                        <Text style={styles.servicePriceStyle}>+8.20</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Total Service Price</Text>
                        <Text style={styles.servicePriceStyle}>460.22</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Admin Profit</Text>
                        <Text style={styles.servicePriceStyle}>-50</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Provider Profit</Text>
                        <Text style={styles.servicePriceStyle}>410.00</Text>
                    </View>
                </View>

                <View style={styles.tripViewStyle}>
                    <Text style={styles.tripTextView}>Delivery Man Transaction</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Paid Order Amount</Text>
                        <Text style={styles.servicePriceStyle}>0.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Cash Amount</Text>
                        <Text style={styles.servicePriceStyle}>2765.22</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Cash On Hand</Text>
                        <Text style={styles.servicePriceStyle}>0.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Deduct From Wallet On Cash Trip</Text>
                        <Text style={styles.servicePriceStyle}>2355.22</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.serviceTextStyle}>Added On Wallet On Card Trip</Text>
                        <Text style={styles.servicePriceStyle}>0.00</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: 'black',
        width: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateViewStyle: {
        width: '99%',
        backgroundColor: Color.TheamCard,
        justifyContent: 'center',
        padding: 5,
        marginBottom: 3
    },
    dateTextStyle: {
        color: Color.White,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    rupeeTextStyle: {
        color: Color.TheamColor,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        // paddingTop: 5
    },
    tripViewStyle: {
        backgroundColor: Color.TheamCard,
        width: '99%',
        marginBottom: 3
    },
    tripTextView: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.TheamColor,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    serviceTextStyle: {
        color: Color.White,
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '75%',
    },
    servicePriceStyle: {
        color: Color.White,
        fontWeight: 'bold',
        fontSize: 16,
        width: '25%',
        paddingHorizontal: 10,
        textAlign: 'right',
    }
})

export default Week;