import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets'
import { useNavigation, useIsFocused, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { DRIVER_ACTIVE_ORDER } from "../../redux/Actions";

const windowWidth = Dimensions.get('window').width;
const Orders = [
    { name: 'DJ Food Store', order: 'Order No #123', Price: '800', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
]

const ActiveOrders = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // console.log("ActiveOrders_screen_isFocused___", isFocused);
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const userCountryDetail = useSelector(state => state.userCountryDetail)
    // console.log("ActiveOrders___loginData___Redux", loginData);
    // console.log("ActiveOrders___userToken___Redux", userToken);
    // console.log("ActiveOrders___userCountryDetail___Redux", userCountryDetail);
    const [activeOrder, setActiveOrder] = useState([])
    const [totalItems, setTotalItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        _ActiveOrder()
    }, [isFocused]);

    function _ActiveOrder() {
        setLoading(true)
        try {
            let dataPass = {
                driver_id: loginData._id
            }
            console.log('dataPass____standby_orders', dataPass)
            Api.postwithToken('api/order/ongoing_order', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__ongoing_order', res)
                    if (res.code == 200) {
                        await setActiveOrder(res.data)
                        console.log('condition___1', res.data.length)
                        if (res.data.length > 0) {
                            await setTotalItems(res.data[0].items)
                        }
                        await dispatch(DRIVER_ACTIVE_ORDER(res.data[0]))
                        setLoading(false)
                    } else if (res.error) {
                        console.log('rres.error__', res.error.message)
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

    const renderItem = ({ item }) => {
        console.log("ActiveOrders_item_", item);
        return (
            <View style={{ width: '100%', marginVertical: 3 }}>
                <TouchableOpacity style={styles.touchableStyle}
                    onPress={() => { navigation.navigate('ActiveDelivery') }}>
                    <View style={styles.mainViewStyle}>
                        <View style={styles.firestViewStyle}>
                            <Image
                                // source={Images.Images.food.dominos}
                                source={{ uri: item.owner_id.restaurant_image.image_url }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.secondViewStyle}>
                            <Text style={styles.textStyle}>{item.owner_id.restaurant_Name}</Text>
                            <Text style={styles.orderText}>{item.o_id}</Text>
                            <Text style={styles.orderText}>Total Items {item.total_items}</Text>
                        </View>
                        <View style={styles.thirdViewStyle}>
                        </View>
                    </View>

                    {/* //./// */}
                    <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: Color.TheamColor, justifyContent: 'space-between', marginVertical: 10, padding: 10 }}>

                        {console.log("totalItems____", totalItems)}
                        {
                            totalItems &&
                            totalItems.map((item) =>
                                <View style={styles.paymentViewStyel}>
                                    {console.log("item___", item)}
                                    <View style={{}}>
                                        <Text style={styles.orderText}>{item.menu_item_id.item_name}</Text>
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.orderText}>{userCountryDetail} {item.final_item_price} </Text>
                                    </View>
                                </View>
                            )}

                        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View>
                                <Text style={[styles.orderText, { fontSize: 16, fontWeight: 'bold', color: Color.TheamColor, }]}>Total</Text>
                            </View>
                            <View>
                                <Text style={[styles.orderText, { fontSize: 16, fontWeight: 'bold', color: Color.TheamColor, }]}> {userCountryDetail} {item.total}</Text>
                            </View>
                        </View>
                    </View>
                    {/* //./// */}

                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Icon name='location-on' type='MaterialIcons' color={Color.TheamColor} size={23} style={styles.iconStyle} />
                        </View>
                        <View style={styles.addressView}>
                            <Text style={styles.AddressText}>{item.owner_id.address[0].user_address}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Icon name='location-on' type='MaterialIcons' color={Color.White} size={23} style={styles.iconStyle} />
                        </View>
                        <View style={styles.addressView}>
                            <Text style={styles.AddressText}>{item.delivery_address}</Text>
                        </View>
                    </View>
                    <Text style={[styles.orderText, { paddingHorizontal: 10, color: Color.TheamColor }]}>Your active delivery.</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function loadEmptyView() {
        return (
            <View style={styles.emptyListView}><Text style={styles.emptyText}>No Data Found</Text></View>
        );
    }

    return (

        <View style={{ flex: 1 }}>
            {
                loading ?
                    <ActivityIndicator color={Color.TheamColor} size="large" />
                    :
                    <FlatList
                        // data={Orders}
                        data={activeOrder}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={() => loadEmptyView()}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    touchableStyle: {
        width: '98%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Color.TheamCard,
        elevation: 25,
        shadowOpacity: 1,
        // shadowColor: Color.White,
        // shadowOffset: { width: 56, height: 13 },
        // shadowRadius: 15,
        alignSelf: 'center'
    },
    paymentViewStyel: {
        width: '100%',
        backgroundColor: Color.TheamCard,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White
    },
    orderText: {
        fontWeight: 'bold',
        color: Color.White,
    },
    AddressText: {
        marginTop: 5,
        color: Color.White
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
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    iconStyle: {
        marginVertical: 5
    },
    addressView: {
        marginHorizontal: 5,
        justifyContent: 'center'
    },
    emptyListView: {
        flex: 1,
        paddingTop: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 17,
    },
})

export default ActiveOrders;