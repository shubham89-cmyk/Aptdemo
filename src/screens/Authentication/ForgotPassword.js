import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { TextInput } from "react-native";
import { Color } from "../../helper";
import Images from '../../assets'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgotPassword = (props) => {
    const navigation = useNavigation();
    // console.log("props__Invoice", props);
    // const { item } = props.route.params
    const [country, setCountry] = useState('')
    const [mobile, setMobile] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:Color.StatusBarColor }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Forgot Password</Text>
                </View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>

                <Image source={Images.Images.general.mobnoverification}
                    style={{ height: 150, width: 150, marginTop: 30 }} />

                {/* <View>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='Select Country'
                        value={country}
                        onChangeText={(country) => setCountry(country)}
                        placeholderTextColor={Color.White}
                    />
                </View> */}
                <View>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='Enter Mobile Number'
                        value={mobile}
                        onChangeText={(mobile) => setMobile(mobile)}
                        placeholderTextColor={Color.White}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Otp") }}
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
    button: {
        backgroundColor: Color.TheamColor,
        width: '100%',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White,
    },
    inputStyle: {
        width: 0.9 * windowWidth,
        height: windowWidth * 0.12,
        marginTop: 30,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: Color.TheamCard,
    },
    buttonView: {
        marginTop: 20,
        width: 0.9 * windowWidth,
        height: windowWidth * 0.12
    }

})

export default ForgotPassword;
