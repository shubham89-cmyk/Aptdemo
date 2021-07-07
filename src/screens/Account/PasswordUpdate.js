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
import { Color } from '../../helper';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PasswordUpdate = (props) => {
    const navigation = useNavigation();
    // const navigation = useNavigation();
    // console.log("props__Invoice", props);
    // const { item } = props.route.params

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
                    <Text style={styles.headerText}>Password Reset</Text>
                </View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <Image source={Images.Images.account.password}
                    style={styles.passImageStyle}
                    resizeMode="contain" />
                <Text style={[styles.headerText, { marginTop: 20 }]}>Password Reset</Text>
                <Text style={styles.passTestStyle}>Your password has been reset successfully</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Account') }} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Continue </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headrMainView: {
        elevation: 25,
        // shadowOpacity: 1,
        // shadowColor: '#fff',
        // shadowOffset: { width: 56, height: 13 },
        // shadowRadius: 15,
        backgroundColor: '#282828',
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
        fontWeight: 'bold',
        // marginTop: 20
    },
    ViewStyle: {
        // height: '100%',
        // width: '100%',
        flex: 1,
        alignItems: 'center',
        // paddingTop: 10,
        backgroundColor: 'black'
        // backgroundColor: 'red'
    },
    passImageStyle: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: windowHeight * 0.15,

    },
    passTestStyle: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 16
    },
    buttonStyle: {
        backgroundColor: '#FA7463',
        width: windowWidth * 0.9,
        height: windowWidth * 0.12,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center'
        // color: '#fff',
        // borderWidth:1,
        // borderColor:'#fff'
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    }

})

export default PasswordUpdate;
