import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import Images from '../../assets';
import { Color } from '../../helper';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePassword = (props) => {
    const userToken = useSelector(state => state.userToken)
    console.log("ChangePassword___userToken___Redux", userToken);

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState('')
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const ref_input2 = useRef(null);
    const ref_input1 = useRef(null);

    function _changePassword() {
        if (current == '' || password == '' || confirm == '') {
            alert('Please enter all details.')
        } else if (password != confirm) {
            alert('New password and Confirm password did not match.')
        } else if (confirm.length < 3) {
            alert('Please enter proper password.')
        } else {
            setLoading(true)
            try {
                let dataPass = {
                    oldPassword: current,
                    newPassword: confirm
                }
                console.log('dataPass____History', dataPass, userToken)
                Api.patch('api/auth/password/change', dataPass, userToken)
                    .then(async (res) => {
                        console.log('res__change', res)
                        if (res.code == 200) {
                            navigation.navigate('PasswordUpdate')
                            setConfirm('')
                            setCurrent('')
                            setPassword('')
                            setLoading(false)
                        } else if (res.error) {
                            console.log('res_change_error__', res.error.message)
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
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon name="chevron-left" size={30} color='#fff' style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Change Password</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <Image source={Images.Images.account.password}
                    style={styles.passImageStyle}
                    resizeMode='center'
                />

                <Text style={styles.headerText}>Change Password</Text>

                <View style={styles.inputView}>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={current}
                            onChangeText={setCurrent}
                            placeholder='Current Password'
                            autoCapitalize='none'
                            returnKeyType='next'
                            placeholderTextColor="#fff"
                            ref={ref_input1}
                            onSubmitEditing={() => ref_input2.current.focus()}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            value={password}
                            onChangeText={setPassword}
                            placeholder='New Password'
                            secureTextEntry={true}
                            placeholderTextColor="#fff"
                            ref={ref_input2}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            value={confirm}
                            onChangeText={setConfirm}
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            placeholderTextColor="#fff"
                            ref={ref_input2}
                        />
                        {
                            loading ?
                                <ActivityIndicator color={Color.TheamColor} size="large" />
                                : <TouchableOpacity onPress={() => {
                                    _changePassword()
                                }} style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                        }
                    </View>
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
        alignItems: 'center',
        backgroundColor: 'black'
    },
    inputView: {
        backgroundColor: Color.TheamCard,
        width: '100%',
        top: 15
    },
    textInputStyle: {
        backgroundColor: 'black',
        width: windowWidth * 0.9,
        height: windowWidth * 0.12,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        color: Color.White,
    },
    buttonStyle: {
        backgroundColor: Color.TheamColor,
        width: windowWidth * 0.9,
        height: windowWidth * 0.12,
        marginTop: 20,
        marginBottom: 40,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White
    },
    passImageStyle: {
        height: '20%',
        width: '30%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
    }

})

export default ChangePassword;
