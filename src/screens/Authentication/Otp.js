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
import Images from '../../assets'
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { TextInput } from "react-native";
import { Color } from "../../helper";
import {
    CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CELL_COUNT = 4;
const Otp = (props) => {
    const navigation = useNavigation();
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [value, setValue] = useState('');
    const [Props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    // console.log("props__Invoice", props);
    // const { item } = props.route.params
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Otp</Text>
                </View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <Image
                    source={Images.Images.general.mobnoverification}
                    style={{ height: 150, width: 150, marginTop: 30 }} />

                {/* <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='-'
                        value={otp1}
                        onChangeText={(otp1) => setOtp1(otp1)}
                        placeholderTextColor={Color.White}
                        secureTextEntry={true}
                        maxLength={1}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='-'
                        value={otp2}
                        onChangeText={(otp2) => setOtp2(otp2)}
                        placeholderTextColor={Color.White}
                        secureTextEntry={true}
                        maxLength={1}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='-'
                        value={otp3}
                        onChangeText={(otp3) => setOtp3(otp3)}
                        placeholderTextColor={Color.White}
                        secureTextEntry={true}
                        maxLength={1}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='-'
                        value={otp4}
                        onChangeText={(otp4) => setOtp4(otp4)}
                        placeholderTextColor={Color.White}
                        secureTextEntry={true}
                        maxLength={1}
                    />
                </View> */}

                <View style={styles.verificationCodeContainer}>
                    <CodeField
                        ref={ref}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, { borderColor: isFocused ? Color.TheamColor : Color.White }]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Login") }}
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
        width: 0.12 * windowWidth,
        height: windowWidth * 0.12,
        marginTop: 30,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: Color.TheamCard,
        marginLeft: 5,
        color: Color.White,
    },
    buttonView: {
        marginTop: 20,
        width: 0.9 * windowWidth,
        height: windowWidth * 0.12
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 60,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 15,
        textAlign: 'center',
        color: Color.White
    },
    verificationCodeContainer: {
        marginTop: 10,
    },

})

export default Otp;
