import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator
} from "react-native";
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { Color } from '../../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../assets';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../redux/Actions";
import Api from "../../services/AppApi";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Account = (props) => {
    // console.log("props__Account", props);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.userToken)
    const firbaseToken = useSelector(state => state.firbaseToken)
    // console.log("Account___userToken___Redux", userToken);
    console.log("Account___firbaseToken___Redux", firbaseToken);
    const [loading, setLoading] = useState(false)

    function _logoutApiCall() {
        try {
            let dataPass = {
                fcm_regi_token: true,
                fcm_registration_token: firbaseToken
            }
            console.log('dataPass_____logoutApiCall', dataPass, userToken)
            Api.postwithToken('api/auth/logout', dataPass, userToken)
                .then(async (res) => {
                    console.log('res__logout', res)
                    if (res.code == 200) {
                        dispatch(LOG_OUT())
                        AsyncStorage.clear()
                    } else if (res.error) {
                        console.log('rres.error__', res.error.message)
                    }
                })
        } catch (error) {
            console.log('catch error__', error)
        }
    }

    function _logout() {
        Alert.alert(
            '',
            'Are you sure you want to Logout?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Yes', onPress: async () => {
                        _logoutApiCall()
                        // dispatch(LOG_OUT())
                        // AsyncStorage.clear()
                    }
                },
            ],
            { cancelable: false }
        )
    }

    const Touch = (props) => {
        console.log("Touch__", props);

        return (
            <TouchableOpacity style={styles.componenTouch}
                onPress={() => {
                    if (props.textname == 'Logout') {
                        _logout()
                    } else {
                        { props.onClick !== undefined ? navigation.navigate(props.onClick) : null }
                    }
                }}
            >
                <View style={styles.componenFirstView}>
                    <Icon name={props.iconname} type='feather' color={Color.TheamColor} size={25} />
                </View>
                <View style={styles.componenSecondView}>
                    <Text style={styles.componenText}>{props.textname}</Text></View>
                <View style={styles.componenThirdView}></View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor, }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                {/* <TouchableOpacity style={styles.headrBack} onPress={() => { navigation.goBack() }}>                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />                </TouchableOpacity> */}
                <View style={styles.headerView}></View>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Account</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <Touch iconname='user' textname='Profile' onClick='Profile' />
                <Touch iconname='settings' textname='Setting' onClick='Setting' />
                <Touch iconname='credit-card' textname='Payment' />
                <Touch iconname='log-out' textname='Logout' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headrMainView: {
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: Color.White,
        // shadowOffset: { width: 0, height: 20 },
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
        paddingHorizontal: 5,
        paddingTop: 5,
        backgroundColor: Color.TheamBlack
    },
    componenTouch: {
        backgroundColor: Color.TheamCard,
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        marginVertical: 0.5
    },
    componenFirstView: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    componenSecondView: {
        width: '85%',
        height: '100%',
        justifyContent: 'center'
    },
    componenText: {
        fontSize: 16,
        color: Color.White,
    },
    componenThirdView: {
        width: '10%',
        height: '100%'
    },


})

export default Account;