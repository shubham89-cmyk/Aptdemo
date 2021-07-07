import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets'
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const Orders = [
    { name: 'DJ Food Store', order: 'Order No #123', Price: '800', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
]

const ActiveDeliveryOption = (props) => {
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const userCountryDetail = useSelector(state => state.userCountryDetail)
    const driverActiveOrder = useSelector(state => state.driverActiveOrder)
    console.log("ActiveDeliveryOption___driverActiveOrder___Redux", driverActiveOrder);
    // console.log("ActiveDeliveryOption___loginData___Redux", loginData);
    // console.log("ActiveDeliveryOption___userToken___Redux", userToken);
    // console.log("ActiveDeliveryOption___userCountryDetail___Redux", userCountryDetail);

    const navigation = useNavigation();
    const [orderStatus, setOrderStatus] = useState(
        driverActiveOrder.delivery_status == "Picked Up" ? 'END DELIVERY' : 'ARRIVE AT DELIVERY PICKUP')
    const [loading, setLoading] = useState(false)

    const { delivery_address, total, o_id, _id } = driverActiveOrder
    const { restaurant_Name } = driverActiveOrder.owner_id
    const { image_url } = driverActiveOrder.owner_id.restaurant_image
    const { landmark, user_address } = driverActiveOrder.owner_id.address[0]


    function _status() {
        console.log("orderStatus______", orderStatus);
        if (orderStatus == 'ARRIVE AT DELIVERY PICKUP') {
            setOrderStatus('PICKUP DELIVERY')
        } else if (orderStatus == 'PICKUP DELIVERY') {
            Alert.alert(
                'Confirm Cart Detail',
                'Please confirm cart items before leave.',
                [
                    { text: 'CANCEL', onPress: () => { console.log('Cancel Pressed'), setOrderStatus('ARRIVE AT DELIVERY PICKUP') }, style: 'cancel' },
                    { text: 'CONFIRM', onPress: () => { _PickedUpOrder() } },
                ],
                { cancelable: false }
            )

        } else if (orderStatus == 'END DELIVERY') {
            _DeliveredOrder()
        }

    }

    function _PickedUpOrder() {
        setLoading(true)
        console.log("in_PickedUpOrder_api_function");
        try {
            let dataPass = {
                order_id: _id,
                driver_id: loginData._id,
                employer_id: driverActiveOrder.owner_id._id,
                delivery_status: "Picked Up",
            }
            console.log('dataPass_PickedUpOrder_delivery_request', dataPass)
            Api.postwithToken('api/order/delivery-request', dataPass, userToken)
                .then(async (res) => {
                    console.log('res_PickedUpOrder_standby_orders', res)
                    if (res.code == 200) {
                        setOrderStatus('END DELIVERY')
                        setLoading(false)
                    } else if (res.code == 400) {
                        Alert.alert(res.data)
                        setLoading(false)
                        navigation.goBack()
                    } else if (res.error) {
                        Alert.alert(res.error.message)
                        navigation.goBack()
                        console.log('res.error__', res.error.message)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('catch error__', error)
            setLoading(false)
        }
    }

    function _DeliveredOrder() {
        setLoading(true)
        console.log("in__DeliveredOrder_api_function");
        try {
            let dataPass = {
                order_id: _id,
                driver_id: loginData._id,
                employer_id: driverActiveOrder.owner_id._id,
                delivery_status: "Delivered",
            }
            console.log('dataPass__DeliveredOrder_delivery-request', dataPass)
            Api.postwithToken('api/order/delivery-request', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__delivery-request', res)
                    if (res.code == 200) {
                        navigation.navigate('Invoice', { OrderDetails: res.data });
                        setLoading(false)
                    } else if (res.code == 400) {
                        Alert.alert(res.data)
                        setLoading(false)
                        navigation.goBack()
                    } else if (res.error) {
                        Alert.alert(res.error.message)
                        navigation.goBack()
                        console.log('res.error__', res.error.message)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('catch error__', error)
            setLoading(false)
        }
    }

    return (
        <View style={styles.authView}>
            {
                loading ?
                    <ActivityIndicator color={Color.TheamColor} size="large" />
                    :
                    <TouchableOpacity
                        onPress={() => { _status() }}
                        style={styles.TabContainer}>
                        <Text style={styles.tabText} >{orderStatus}</Text>
                    </TouchableOpacity>
            }

            {/* .... */}
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.touchableStyle}>
                    <View style={styles.mainViewStyle}>
                        <View style={styles.firestViewStyle}>
                            <Image
                                // source={Images.Images.food.dominos}
                                source={{ uri: image_url }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.secondViewStyle}>
                            <Text style={styles.textStyle}>{restaurant_Name}</Text>
                            <Text style={styles.orderText}>{o_id}</Text>
                            <Text style={styles.orderText}>{userCountryDetail} {total}</Text>
                        </View>
                        <View style={styles.thirdViewStyle}>
                            {/* <Icon name='shopping-bag' type='Feather' color={Color.TheamColor} size={25} style={[styles.iconStyle, { paddingRight: 10 }]} /> */}
                            <Icon name='call' type='Zocial' color={Color.TheamColor} size={25} style={styles.iconStyle} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', }}>
                        <Icon name='map-pin' type='feather' color={Color.TheamColor} size={20} style={styles.iconStyle} />
                        <Text numberOfLines={2} style={styles.AddressText}>{user_address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', }}>
                        <Icon name='map-pin' type='feather' color={Color.White} size={20} style={styles.iconStyle} />
                        <Text numberOfLines={2} style={styles.AddressText}>{delivery_address}</Text>
                    </View>
                </View>

                <View style={styles.viewFourStyle}>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.White }}>Est. Time</Text>
                        <Text style={{ color: Color.White }}>14.50 min</Text>
                    </View>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.White }}>Est. Distance</Text>
                        <Text style={{ color: Color.White }}>6.01 km</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    authView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Color.TheamBlack,
        paddingBottom: 20
    },
    TabContainer: {
        width: '98%',
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: Color.TheamCard,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 13
    },
    tabText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
    tabView: {
        padding: 16,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 2
    },
    touchableStyle: {
        width: '98%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Color.TheamCard,
        alignSelf: 'center',
        marginBottom: 5,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.White
    },
    orderText: {
        fontWeight: 'bold',
        color: Color.White,
        marginTop: 5,
        fontSize: 12
    },
    AddressText: {
        marginLeft: 5,
        color: Color.White
    },
    mainViewStyle: {
        flexDirection: 'row',
        width: '98%',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: 10,
    },
    imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    iconStyle: {
        // marginTop: 5,
    },
    viewFourStyle: {
        width: '98%',
        paddingVertical: 5,
        backgroundColor: Color.TheamCard,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default ActiveDeliveryOption;