import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets'
import UpcomingOrderMap from './UpcomingOrderMap'
import UpcomingOrderOption from './UpcomingOrderOption'
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const Orders = [
    { name: 'DJ Food Store', order: 'Order No #123', Price: '800', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
]

const AcceptedOrder = (props) => {
    const navigation = useNavigation();
    console.log("props__AcceptedOrder", props);
    const { item } = props.route.params

    return (
        <SafeAreaView>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon name="chevron-left" size={30} color='#fff' style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Accepted Order</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.authView}>
                <View style={{ width: '100%', }}><UpcomingOrderMap /></View>
                <View style={{ width: '100%', position: 'absolute', bottom: '12%', }}><UpcomingOrderOption AllDetails={item} /></View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    headrMainView: {
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: Color.White,
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

export default AcceptedOrder;