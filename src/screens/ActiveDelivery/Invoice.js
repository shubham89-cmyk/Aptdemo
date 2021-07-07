import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    BackHandler,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Invoice = (props) => {
    const navigation = useNavigation();
    const userCountryDetail = useSelector(state => state.userCountryDetail)
    console.log("Invoice_props", props);
    const { total, items } = props.route.params.OrderDetails

    function backButtonHandler() {
        console.log("props__backButtonHandler", props);
        console.log("________", props.route.name);
        navigation.navigate('Home')
        // console.log("navigation__", route);
        // if (route.name === 'Invoice') {
        //     // BackHandler.exitApp()
        // } else {
        //     return false
        // }
        return true;
        // props.navigation.navigate('Home');
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:Color.StatusBarColor }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <View style={styles.headerView}></View>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Invoice</Text>
                </View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <View style={styles.firstViewStyle}>
                    <View style={styles.innserViewStyle}>
                        <Icon name='clock' type='feather' color={Color.TheamColor} size={30} style={styles.iconStyle} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: Color.White }}>Time(h:m)</Text>
                            <Text style={{ color: Color.White }}>0 : 40</Text>
                        </View>
                    </View>
                    <View style={styles.innserViewStyle}>
                        <Icon name='map' type='feather' color={Color.TheamColor} size={30} style={styles.iconStyle} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: Color.White }}>Distance</Text>
                            <Text style={{ color: Color.White }}>6.01 km</Text>
                        </View>
                    </View>
                    {/* <View style={styles.innserViewStyle}>
                        <Icon name='payment' type='MaterialIcons' color={Color.TheamColor} size={30} style={styles.iconStyle} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: Color.White }}>Payment</Text>
                            <Text style={{ color: Color.White }}>Cash</Text>
                        </View>
                    </View> */}
                </View>

                <Text style={styles.paymentTextStyle}>Payment</Text>

                {/* .............. */}
                {console.log("__items__", items)}
                {items.map((item, index) =>
                    <View style={styles.paymentViewStyel}>
                        {console.log("item___", item)}
                        <View style={{}}>
                            <Text style={styles.paymentDetailTextStyle}>{item.menu_item_id.item_name}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={styles.paymentDetailTextStyle}>{userCountryDetail} {item.final_item_price} </Text>
                        </View>
                    </View>
                )}
                {/* .............. */}

                {/* {exchangeList.map((item, index) =>

                    <TouchableOpacity onPress={() => _onChange(item)}
                        key={index} style={[styles.cardContainer, { borderColor: 'white', flexDirection: 'row', alignItems: 'center' }]}>
                        <Image
                            source={{ uri: `https://assets.shrimpy.io/cryptoicons/png/${item.id}.png` }}
                            defaultSource={Images.Images.currency.btc}
                            style={{ height: 30, width: 30 }}
                        // source={currency.icon}
                        />
                        <Text style={[styles.card, { color: 'white' }]}>{item.symbol}</Text>
                    </TouchableOpacity>
                )} */}
                <View style={styles.paymentViewStyel}>
                    <View style={{}}>
                        {/* <Text style={styles.paymentDetailTextStyle}>Service Price</Text> */}
                        {/* <Text style={styles.paymentDetailTextStyle}>Service Tax</Text> */}
                        {/* <Text style={styles.paymentDetailTextTwoStyle}>item.menu_item_id.item_name</Text> */}
                        <Text style={styles.paymentDetailTextTwoStyle}>Total Service Tax</Text>
                    </View>
                    <View style={{}}>
                        {/* <Text style={styles.paymentDetailTextStyle}>{userCountryDetail} 104.00</Text> */}
                        {/* <Text style={styles.paymentDetailTextStyle}>{userCountryDetail} 0.00</Text> */}
                        {/* <Text style={styles.paymentDetailTextTwoStyle}>{userCountryDetail} 209.20</Text> */}
                        <Text style={styles.paymentDetailTextTwoStyle}>{userCountryDetail} 00.00</Text>
                    </View>
                </View>

                <Text style={styles.paymentTextStyle}>Other Earning</Text>
                <View style={styles.paymentViewStyel}>
                    <View>
                        <Text style={styles.paymentDetailTextStyle}>Profit</Text>
                    </View>
                    <View>
                        <Text style={styles.paymentDetailTextStyle}>{userCountryDetail} 00.00</Text>
                    </View>
                </View>

                <View style={styles.lastViewStyle}>
                    {/* <View style={styles.firstViewStyle}>
                        <View style={styles.innserViewStyle}>
                            <Icon
                                name='account-balance-wallet'
                                type='MaterialIcons'
                                color={Color.TheamColor}
                                size={30}
                                style={styles.iconStyle}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: Color.White }}>Wallet</Text>
                                <Text style={{ color: Color.White }}>{userCountryDetail} 0.00</Text>
                            </View>
                        </View>
                        <View style={styles.innserViewStyle}>
                            <Icon
                                name='payment'
                                type='MaterialIcons'
                                color={Color.TheamColor}
                                size={30}
                                style={styles.iconStyle}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: Color.White }}>Cash</Text>
                                <Text style={{ color: Color.White }}>{userCountryDetail} 188.28</Text>
                            </View>
                        </View>
                    </View> */}

                    <View style={{
                        width: '100%',
                        padding: 10,
                        backgroundColor: Color.TheamCard,
                        alignItems: 'center',
                        marginTop: 1,
                        justifyContent: 'space-around',
                    }}>
                        <Text style={{ fontWeight: 'bold', color: Color.TheamColor }}>Total</Text>
                        <Text style={{ fontSize: 40, color: Color.White }}>{userCountryDetail} {total}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate('Feedback') }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: Color.TheamBlack
    },
    button: {
        backgroundColor: Color.TheamColor,
        width: '100%',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White,
    },
    firstViewStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: Color.TheamCard,
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 2,
        justifyContent: 'space-around',
    },
    innserViewStyle: {
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconStyle: {
        margin: 5
    },
    paymentViewStyel: {
        width: '100%',
        backgroundColor: Color.TheamCard,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentTextStyle: {
        alignSelf: 'flex-start',
        paddingVertical: 7,
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.White,
    },
    paymentDetailTextStyle: {
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
        color: Color.White,
    },
    paymentDetailTextTwoStyle: {
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: 'bold',
        color: Color.TheamColor,
    },
    lastViewStyle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    }

})

export default Invoice;

// useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             if (isSelectionModeEnabled()) {
    //                 disableSelectionMode();
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         };

    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);

    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, [isSelectionModeEnabled, disableSelectionMode])
    // );