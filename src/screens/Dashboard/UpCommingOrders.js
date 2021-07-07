import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets'
import { useNavigation, useIsFocused, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = [
    { name: 'DJ Food Store', order: 'Order No #123', Price: '800', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Food Store', order: 'Order No #457', Price: '540', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Food Cafe', order: 'Order No #444', Price: '350', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Food Zone', order: 'Order No #356', Price: '300', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Nukkad', order: 'Order No #428', Price: '700', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Food Mall', order: 'Order No #123', Price: '100', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
    { name: 'Food Bazar', order: 'Order No #123', Price: '600', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' }
]

const UpCommingOrders = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    console.log("UpCommingOrders_screen_isFocused___", isFocused);
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const userCountryDetail = useSelector(state => state.userCountryDetail)
    console.log("UpCommingOrders___loginData___Redux", loginData);
    console.log("UpCommingOrders___userToken___Redux", userToken);
    console.log("UpCommingOrders___userCountryDetail___Redux", userCountryDetail);

    const [totalItems, setTotalItems] = useState([])
    const [allOrder, setAllOrder] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        _UpcomingOrder()
    }, [isFocused]);

    function _UpcomingOrder() {
        setLoading(true)
        try {
            let dataPass = {
                isAggregatorDrivers: loginData.isAggregatorDrivers,
                isRestaurantDrivers: loginData.isRestaurantDrivers,
                employer_id: loginData.employer_id,
                delivery_status: "Broadcast to Drivers"
            }
            console.log('dataPass____standby_orders', dataPass)
            Api.postwithToken('api/order/standby_orders', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__standby_orders', res)
                    if (res.code == 200) {
                        await setAllOrder(res.data)
                        if (res.data.length > 0) {
                            console.log('inn')
                            await setTotalItems(res.data[0].items)
                        }
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
        console.log("UpComming_item__", item);
        return (
            <View style={{ width: '100%', marginVertical: 3 }}>
                <TouchableOpacity style={styles.touchableStyle}
                    onPress={() => {
                        navigation.navigate('AcceptedOrder', { item: item })
                    }}
                >
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

                    {/* <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: Color.TheamColor, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, padding: 10 }}>
                        <View>
                            <Text style={styles.orderText}>{item.items[0].menu_item_id.item_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.orderText}>{userCountryDetail} {item.total}</Text>
                        </View>
                    </View> */}

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
                    <Text style={[styles.orderText, { paddingHorizontal: 10, color: Color.TheamColor }]}>You get new delivery.</Text>
                </TouchableOpacity>
            </View >
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
                        data={allOrder}
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
        // shadowOpacity: 1,
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

export default UpCommingOrders;