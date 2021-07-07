import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    Switch
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import { useNavigation, useIsFocused, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import firebase, { Notification } from 'react-native-firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = (props) => {
    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    // console.log("userToken__Home", userToken);

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);

    const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [orderCount, setOrderCount] = useState(0)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchOffline = () => setIsOffline(previousState => !previousState);
    const navigation = useNavigation();
    var _notificationData = {}
    let on_Notification, on_NotificationOpen = null

    // useEffect(() => {
    //     _UpcomingOrder()
    //     try {
    //         firebase.messaging().requestPermission();
    //         // User has authorised
    //         firebase.messaging().hasPermission()
    //             .then(enabled => {
    //                 // console.log("enabled___", enabled);
    //                 if (enabled) {
    //                     // user has permissions
    //                     // console.log("has permissions");
    //                     // firebase.messaging()
    //                     //     .getToken()
    //                     //     .then(token => {
    //                     //         console.log('Firebasetoken__', token)
    //                     //         // dispatch(FIREBASE_TOKEN(token))
    //                     //         // _onNotificationOpen()
    //                     //     });
    //                     _onNotification()
    //                     _getInitialNotification()
    //                 } else {
    //                     console.log("doesn't have permission");
    //                     // user doesn't have permission
    //                 }
    //             });

    //     } catch (error) {
    //         // User has rejected permissions
    //     }
    //     return () => { on_NotificationOpen }

    // }, [isFocused])

    useEffect(() => {
        console.log("innn_useEffect");
        var executed = false;
        // _UpcomingOrder()
        return function () {
            if (!executed) {
                executed = true;
                console.log("innn_useEffect_Condition");
                _onNotification()
            }
        };
    }, [isFocused])

    // function _onNotificationOpen() {
    //     on_NotificationOpen = firebase.notifications().onNotificationOpened((notificationData) => {
    //         console.log('on_notification_open', notificationData)
    //         // _notificationData.data = notificationData.notification._data
    //         // console.log('_onNotificationOpen___notification DATA', _notificationData)
    //     })
    // }

    async function _getInitialNotification() {
        const notificationData = await firebase.notifications().getInitialNotification()
        console.log('initial___notification', notificationData)

        firebase.notifications().getInitialNotification()
            .then((notificationOpen) => {
                console.log("notificationOpen___", notificationOpen);
                if (notificationOpen) {
                    const action = notificationOpen.action;
                    const notification = notificationOpen.notification;
                    console.log('GET INITIAL', notification)
                    RedirectToPage(notification)
                }
            });
        // _notificationData.data = notificationData.notification._data
        // console.log('_notification DATA', _notificationData)
    }

    function _onNotification() {
        on_NotificationOpen = firebase.notifications().onNotification((notificationData) => {
            console.log('on_notification', notificationData)
            const notification = new firebase.notifications.Notification()
            notification.setNotificationId('notificationId')
            notification.setTitle(notificationData._title)
            notification.setBody(notificationData._body)
            notification.setSound('default')
            notification.android.setSmallIcon(notificationData._android._smallIcon.icon);
            notification.android.setLargeIcon(notificationData._android._largeIcon)
            notification.android.setChannelId('test-channel')
            notification.android.setAutoCancel(true);
            firebase.notifications().displayNotification(notification)
        })
    }

    function _UpcomingOrder() {
        try {
            let dataPass = {
                isAggregatorDrivers: loginData.isAggregatorDrivers,
                isRestaurantDrivers: loginData.isRestaurantDrivers,
                employer_id: loginData.employer_id,
                delivery_status: "Broadcast to Drivers"
            }
            // console.log('dataPass____standby_orders', dataPass)
            Api.postwithToken('api/order/standby_orders', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__standby_orders', res)
                    if (res.code == 200) {
                        // console.log('OrderCount___', res.data.length)
                        res.data.length > 0 ? setOrderCount(res.data.length) : 0
                    } else if (res.error) {
                        console.log('rres.error__', res.error.message)
                    }
                })
        } catch (error) {
            console.log('catch error__', error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor, }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <View style={styles.headerView}></View>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Delivery Man</Text>
                </View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>

                <MapView
                    // provider={PROVIDER_GOOGLE}  // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 21.15019984640006,
                        longitude: 72.77434764651416,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}>
                    <Marker coordinate={{ latitude: 21.15103984640006, longitude: 72.77434764651416 }} >
                        <Image
                            source={Images.Images.AppIcon.loginScreen} style={{ marginBottom: 10, width: 50, height: 45 }}
                            resizeMode="contain"
                        />
                    </Marker>

                    <Marker
                        coordinate={{ latitude: 21.160031296166828, longitude: 72.79727935435226 }} >
                        <Image
                            source={Images.Images.general.userLocation}
                            style={{ marginBottom: 10, width: 50, height: 45 }}
                            resizeMode="contain"
                        />
                    </Marker>
                </MapView>

                {
                    isOffline == false ?
                        <View style={styles.lastViewStyle}>
                            <Text style={styles.onLineTextStyle}>Go Online To {'\n'}  Recive Delivery Request</Text>
                        </View>
                        : null}

                <View style={{ height: '100%', width: '100%' }}>
                    <View style={styles.bottomViewStyle}>
                        {/* {console.log("orderCount___", orderCount)} */}
                        <TouchableOpacity
                            disabled={isOffline == false ? true : false}
                            onPress={() => { navigation.navigate("Dashboard") }}
                            style={{ width: '100%', paddingHorizontal: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Color.White }}>Available Delivery</Text>
                            <View style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 20, borderColor: Color.TheamColor, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Color.White }}>{orderCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 0.7, borderColor: Color.TheamBlack, width: '100%', marginBottom: 10 }}></View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.innserViewStyle}>
                                <Text style={{ color: Color.White }}>Accept Delivery</Text>
                                <Switch
                                    trackColor={{ false: Color.Switch, true: Color.TheamBlack }}
                                    thumbColor={isEnabled ? Color.TheamColor : Color.White}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                />
                            </View>
                            <View style={{ marginRight: 10, borderWidth: 1, borderColor: Color.TheamBlack, height: '100%' }}></View>
                            <View style={styles.innserViewStyle}>
                                <Text style={{ color: Color.White }}>Go Online</Text>
                                <Switch
                                    trackColor={{ false: Color.Switch, true: Color.TheamBlack }}
                                    thumbColor={isOffline ? Color.TheamColor : Color.White}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchOffline}
                                    value={isOffline}
                                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                />
                            </View>
                        </View>

                    </View>
                </View>

            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
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
    innserViewStyle: {
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    bottomViewStyle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: Color.TheamCard,
        borderBottomWidth: 2,
        borderBottomColor: Color.TheamBlack
    },
    buttonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White,
    },
    lastViewStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    onLineTextStyle: {
        paddingBottom: '20%',
        fontWeight: 'bold',
        fontSize: 25,
        color: Color.White,
        textAlign: 'center'
    }
})

export default Home;