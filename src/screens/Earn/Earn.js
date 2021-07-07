import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import Day from './Day'
import Week from './Week'
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Earn = (props) => {
    console.log("props__Earn", props);
    const navigation = useNavigation();
    const [days, setDays] = useState(true)
    const [week, setWeek] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor, }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <View style={styles.headerView}></View>
                <View style={styles.headerSecondView}><Text style={styles.headerText}>Earn</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'black' }}>

                <View style={styles.TabContainer}>
                    <TouchableOpacity
                        style={[styles.tabView, { backgroundColor: days ? Color.TheamColor : Color.TheamCard }]}
                        onPress={() => { setDays(true), setWeek(false) }}
                    >
                        <Text style={styles.tabText} >Days</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabView, { backgroundColor: week ? Color.TheamColor : Color.TheamCard }]}
                        onPress={() => { setDays(false), setWeek(true) }}
                    >
                        <Text style={styles.tabText} >Week</Text>
                    </TouchableOpacity>
                </View>
                {
                    days &&
                    <Day />
                }
                {
                    week &&
                    <Week />
                }
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headrMainView: {
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: '#fff',
        // shadowOffset: { width: 56, height: 13 },
        // shadowRadius: 15,
        backgroundColor: Color.TheamCard,
        width: '100%',
        height: '7%',
        paddingTop: 10,
        flexDirection: 'row'
    },
    headrBack: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerSecondView: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerView: {
        width: '10%',
        height: '100%'
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    ViewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    textStyle: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: 'center',
        justifyContent: 'center',
        top: 45,
        color: Color.White
    },
    innerViewStyle: {
        width: windowWidth,
        height: windowWidth * 0.15,
        backgroundColor: Color.TheamCard,
        top: 4,
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: 'black',
        // shadowOffset: { width: 56, height: 13 },
        // shadowRadius: 15,
        flexDirection: 'row',
    },
    orderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White
    },
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.5,
        backgroundColor: Color.TheamColor

    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.5,
        backgroundColor: Color.TheamCard

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
        width: '98%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#282828',
        backgroundColor: Color.TheamBlack
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
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    }

})

export default Earn;