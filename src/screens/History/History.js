import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = [
    { name: 'Mini Gandhi', order: '91237', price: '1937.94', profit: '188.28', time: '18:10', date: '12-01-2021' },
    { name: 'Deep Moteria', order: '123', price: '800.90', profit: '14.18', time: '12:10', date: '24-01-2021' },
    { name: 'Om Misra', order: '678', price: '950.10', profit: '45.08', time: '12:01', date: '28-01-2021' },
    { name: 'Darshan Shah', order: '6578', price: '211.87', profit: '23.26', time: '11:10', date: '29-01-2021' },

    { name: 'Twinkal Swami', order: '2342', price: '9879.94', profit: '188.28', time: '18:10', date: '12-01-2021' },
    { name: 'Ankita Patel', order: '9889', price: '234.90', profit: '14.18', time: '12:10', date: '24-01-2021' },
    { name: 'Pooja Misra', order: '867', price: '574.10', profit: '45.08', time: '12:01', date: '28-01-2021' },
    { name: 'Nindini Kadam', order: '284', price: '1243.87', profit: '23.26', time: '11:10', date: '29-01-2021' },

    { name: 'Max Soni', order: '234', price: '345.94', profit: '188.28', time: '18:10', date: '12-01-2021' },
    { name: 'Darpan Kapadiya', order: '2353', price: '674.90', profit: '14.18', time: '12:10', date: '24-01-2021' },
    { name: 'Raj Narayan', order: '7375', price: '232.10', profit: '45.08', time: '12:01', date: '28-01-2021' },
    { name: 'Lomas Shah', order: '2454', price: '452.87', profit: '23.26', time: '11:10', date: '29-01-2021' },
]

const History = (props) => {
    const navigation = useNavigation();
    // console.log("props__History", props);
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const userCountryDetail = useSelector(state => state.userCountryDetail)
    console.log("History___loginData___Redux", loginData);
    console.log("History___userToken___Redux", userToken);
    console.log("History___userCountryDetail___Redux", userCountryDetail);
    const [historyList, setHistoryList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        _HistoryOrder()
    }, []);

    function _HistoryOrder() {
        setLoading(true)
        try {
            let dataPass = {
                startDate: "",
                endDate: "",
                owner_id: "",
                items_in_page: 50,
                page_number: 1
            }
            console.log('dataPass____History', dataPass)
            Api.postwithToken('api/order/driver_orders', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__driver_orders', res)
                    if (res.code == 200) {
                        await setHistoryList(res.data.result[0].docs)
                        setLoading(false)
                    } else if (res.error) {
                        console.log('res_driver_orders_error__', res.error.message)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('_HistoryOrder catch error__', error)
            setLoading(false)
        }
    }

    const renderItem = ({ item }) => {
        console.log("HistoryOrder_item_", item);
        const { o_id, total, time_slot, profit } = item
        const { name } = item.client_name
        const { restaurant_Name } = item.restaurant_Name

        return (
            <View style={{ width: '100%', marginVertical: 1 }}>

                <View style={styles.touchableStyle}>
                    <View style={styles.mainViewStyle}>
                        <View style={styles.firestViewStyle}>
                            <Icon name='delivery-dining' type='MaterialIcons' color={Color.TheamColor} size={35} />
                        </View>
                        <View style={styles.secondViewStyle}>
                            <Text style={styles.textStyle}>{name}</Text>
                            <Text style={styles.orderText}>Restaurant Name: {restaurant_Name}</Text>
                            <Text style={styles.orderText}>{o_id}</Text>
                            <Text style={styles.orderText}>{time_slot}</Text>
                        </View>
                        <View style={styles.thirdViewStyle}>
                            <Text style={styles.textStyle}>{userCountryDetail} {total}</Text>
                            <Text style={styles.orderText}>profit {userCountryDetail} {profit ? profit : '00.0'}</Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
    console.log("historyList__", historyList);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor, }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <View style={styles.headerView}></View>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>History</Text></View>
                <View style={styles.headerView}></View>
            </View>
            <View style={styles.ViewStyle}>
                {
                    loading ?
                        <ActivityIndicator color={Color.TheamColor} size="large" />
                        : <FlatList
                            // data={Orders}
                            data={historyList}
                            style={{ marginVertical: 2 }}
                            renderItem={renderItem}
                            keyExtractor={item => item.name}
                        />
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
    touchableStyle: {
        width: '99%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Color.TheamCard,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White
    },
    orderText: {
        color: Color.White
    },
    mainViewStyle: {
        flexDirection: 'row',
        width: '100%',
    },
    firestViewStyle: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondViewStyle: {
        width: '60%',
    },
    thirdViewStyle: {
        width: '25%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

})

export default History;