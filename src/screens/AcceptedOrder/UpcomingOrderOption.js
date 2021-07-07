import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
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

const UpcomingOrderOption = ({ AllDetails }) => {
    const navigation = useNavigation();
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const userCountryDetail = useSelector(state => state.userCountryDetail)

    const [seconds, setSeconds] = React.useState(60);
    const [allOrder, setAllOrder] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("AllDetails__UpcomingOrderOption", AllDetails);
    const { delivery_address, total, o_id, _id } = AllDetails
    const { restaurant_Name } = AllDetails.owner_id
    const { image_url } = AllDetails.owner_id.restaurant_image
    const { landmark, user_address } = AllDetails.owner_id.address[0]

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(0);
            _TimeOute()
        }
    });


    function _TimeOute() {
        Alert.alert(
            '',
            'Your Time Is Over',
            [
                {
                    text: 'OK', onPress: () => {
                        console.log('Cancel Pressed')
                        navigation.goBack()
                    },
                    style: 'cancel'
                },
            ],
            { cancelable: false }
        )
    }

    function _AcceptOrder() {
        setLoading(true)
        console.log("in api function");
        try {
            let dataPass = {
                order_id: _id,
                driver_id: loginData._id,
                delivery_status: "Accepted by Driver",
            }
            console.log('dataPass____standby_orders', dataPass)
            Api.postwithToken('api/order/delivery-request', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__delivery-request', res)
                    if (res.code == 200) {
                        navigation.goBack()
                        setLoading(false)
                    } else if (res.code == 400) {
                        alert(res.data)
                        setLoading(false)
                        navigation.goBack()
                    } else if (res.error) {
                        alert(res.error.message)
                        // Alert.alert("You cant take another order First Delivered active order.");
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
            <View style={styles.TabContainer}>
                {
                    loading ?
                        <ActivityIndicator color={Color.TheamColor} size="large" style={styles.TabContainer} />
                        :
                        <>
                            <TouchableOpacity
                                style={[styles.tabView, { backgroundColor: Color.TheamCard }]}
                                onPress={() => { _AcceptOrder() }}
                            >
                                <Text style={styles.tabText} >Accept</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 0.2, marginHorizontal: 3, borderWidth: 3, borderRadius: 10, borderColor: Color.TheamColor, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: Color.White, fontSize: 20 }}>{seconds}</Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.tabView, { backgroundColor: Color.TheamCard }]}
                                onPress={() => { navigation.goBack() }}
                            >
                                <Text style={styles.tabText} >Reject</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
            {/* .... */}
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.containViewStyle}>
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
                        <TouchableOpacity style={styles.thirdViewStyle}>
                            {/* <Icon name='shopping-bag' type='Feather' color={Color.TheamColor} size={25} style={[styles.iconStyle, { paddingRight: 10 }]} /> */}
                            <Icon name='call' type='Zocial' color={Color.TheamColor} size={25} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', }}>
                        <Icon name='map-pin' type='feather' color={Color.TheamColor} size={20} style={styles.iconStyle} />
                        <Text numberOfLines={2} style={styles.AddressText}>{user_address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
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
    },
    TabContainer: {
        width: '98%',
        marginVertical: 5,
        flexDirection: 'row',
    },
    tabText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
    tabView: {
        padding: 16,
        justifyContent: 'center',
        flex: 0.4,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 2
    },
    containViewStyle: {
        width: '98%',
        justifyContent: 'center',
        // padding: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
        // padding: 10,
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
        marginBottom: '4.5%',
        justifyContent: 'space-around',
    }
})

export default UpcomingOrderOption;