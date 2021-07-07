import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Color } from '../../helper';
import Images from '../../assets'
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";
import { FIREBASE_TOKEN, USER_LOGIN, USER_TOKEN, USER_COUNTRY_DETAIL } from "../../redux/Actions";
import firebase, { Notification } from 'react-native-firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Authentication = ({ navigation }) => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [firebaseToken, setFirebaseToken] = useState('')
    const [loading, setLoading] = useState(false)
    const ref_input2 = useRef(null);
    const ref_input1 = useRef(null);
    let on_Notification, on_NotificationOpen

    useEffect(() => {
        try {
            firebase.messaging().requestPermission();
            // User has authorised
            firebase.messaging().hasPermission()
                .then(enabled => {
                    console.log("enabled___", enabled);
                    if (enabled) {
                        // user has permissions
                        console.log("has permissions");
                        firebase.messaging()
                            .getToken()
                            .then(token => {
                                console.log('AuthenticationScreen_token__', token),
                                    dispatch(FIREBASE_TOKEN(token))
                                setFirebaseToken(token)
                            });
                    } else {
                        console.log("doesn't have permission");
                    }
                });

        } catch (error) {
            console.log("error___", error);
        }

    }, [])


    function _auth() {
        let filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        // if (filter.test(phone) == false) {
        //     alert('Please enter valid phone number.')
        // } else if (password.length < 3) {
        //     setPassword('')
        //     alert('Please enter valid password')
        // } else {
        // setPhone('')
        // setPassword('')
        // id:+91 94284 04379
        // id:+91 86516 85810
        // pwd:123
        setLoading(true)
        try {
            let dataPass = {
                phone: "+91" + '8651685810',
                password: '123',
                fcm_registration_token: firebaseToken
                // phone: "+91" + phone,
                // password: password
            }
            console.log('dataPass____', dataPass)
            Api.post('api/auth/login', dataPass)
                .then(async (res) => {
                    console.log('res__login', res)
                    if (res.code == 200) {
                        dispatch(USER_LOGIN(res.data.user))
                        dispatch(USER_TOKEN(res.data.token))
                        dispatch(USER_COUNTRY_DETAIL(res.data.user.currencies.symbol))
                        navigation.navigate('Main')
                        setLoading(false)
                    } else if (res.error) {
                        alert(res.error.message)
                        setLoading(false)
                    }
                    else {
                        alert("Somthing worng please try later.")
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('catch error__', error)
            setLoading(false)
        }
        // }
    }

    return (
        <View style={style.authView}>
            <View style={style.textView}>
                <Image source={Images.Images.AppIcon.loginScreen} style={{ height: '70%', width: "80%" }} resizeMode='contain' />
            </View>

            <View style={style.seconView}>
                <Text style={style.headerTextStyle}>Welcome</Text>
                <Text style={style.subTextStyle}>Welcom to driver side of Appettizar application.</Text>
                <TextInput
                    style={style.textInputStyle}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='Enter your Phone number'
                    autoCapitalize='none'
                    returnKeyType='next'
                    placeholderTextColor="#fff"
                    ref={ref_input1}
                    keyboardType='number-pad'
                    onSubmitEditing={() => ref_input2.current.focus()} />
                <TextInput
                    style={style.textInputStyle}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Enter your Password'
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    ref={ref_input2} />
                {
                    loading ?
                        <ActivityIndicator color={Color.TheamColor} size="large" />
                        :
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => { _auth() }}>
                            <Text style={style.buttonText}>Login</Text>
                        </TouchableOpacity>
                }
                {/* <Text onPress={() => { navigation.navigate('ForgotPassword') }} style={{ color: 'white', alignSelf: 'flex-end', marginRight: 30 }}>Forgot Password</Text> */}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    authView: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Color.TheamColor,
    },
    textView: {
        flex: 0.6,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seconView: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        flex: 0.4,
        justifyContent: 'center',
        backgroundColor: Color.TheamBlack
    },
    headerTextStyle: {
        paddingTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.White
    },
    subTextStyle: {
        paddingHorizontal: 10,
        fontSize: 12,
        color: Color.White
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.White,
        marginTop: windowHeight * 0.35
    },
    textInputStyle: {
        backgroundColor: Color.TheamCard,
        width: windowWidth * 0.9,
        height: windowWidth * 0.12,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        color: Color.White,
    },
    button: {
        backgroundColor: Color.TheamColor,
        width: '90%',
        marginTop: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White,
    }
})

export default Authentication;