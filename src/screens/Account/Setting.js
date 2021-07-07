import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Switch
} from "react-native";
import { Color } from '../../helper';
import Images from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Setting = (props) => {
    console.log("props__Setting", props);
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={16} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Settings</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
                    <View style={styles.secViewStyle}>
                        <Icon name='lock' color={Color.TheamColor} style={styles.profilepicStyle} size={25} />
                        <Text style={styles.textStyle}>Change Password</Text>
                        <Icon name="chevron-right" size={15} color={Color.White} />
                    </View>
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
        fontWeight: 'bold'
    },
    ViewStyle: {
        flex: 1,
        backgroundColor: 'black'
    },
    secViewStyle: {
        width: '100%',
        backgroundColor: Color.TheamCard,
        marginTop: 3,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    profilepicStyle: {
        width: '10%',
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White,
        width: '75%',
    }

})

export default Setting;

/* <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Settings</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                <View style={styles.mainViewStyle}>
                    <View style={styles.firestViewStyle}>
                        <Icon
                            name='volume-up'
                            type='FontAwesome'
                            color={Color.TheamColor}
                            size={35}
                        />
                    </View>
                    <View style={styles.secondViewStyle}>
                        <Text style={styles.textStyle}>Request Alert</Text>
                        <Text style={styles.orderText}>Play's sound when you recive new request.</Text>
                    </View>
                    <View style={styles.thirdViewStyle}>
                        <Switch
                            trackColor={{ false: "#767577", true: Color.TheamBlack }}
                            thumbColor={isEnabled ? Color.TheamColor : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                    </View>
                </View>
            </View> */