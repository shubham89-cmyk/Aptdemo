import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { useNavigation, useIsFocused, useFocusEffect, useRoute } from '@react-navigation/native';
import { Color } from '../../helper';
import Images from '../../assets';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    console.log("isFocused___", isFocused);

    const loginData = useSelector(state => state.loginData)
    const userToken = useSelector(state => state.userToken)
    const [loading, setLoading] = useState(false)
    const [profileName, setProfileName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [userProfileDetail, setUserProfileDetail] = useState({})

    useEffect(() => {
        _ProfleDetails()
    }, [isFocused]);

    function _ProfleDetails() {
        setLoading(true)
        console.log("loginData_id", loginData._id);
        try {
            Api.get('api/user/profile/' + loginData._id, userToken)
                .then(async (res) => {
                    console.log('res_driver_profile', res)
                    if (res.code == 200) {
                        await setUserProfileDetail(res.data.user)
                        await setProfileName(res.data.user.name)
                        await setProfileImage(res.data.user.profile_image.image_url)
                        setLoading(false)
                    } else if (res.error) {
                        console.log('res_driver_profile_error_', res.error.message)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('profile_catch_error_', error)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: Color.StatusBarColor,}}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon name="chevron-left" size={30} color='#fff' style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Profile</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                {
                    loading ?
                        <ActivityIndicator color={Color.TheamColor} size="large" />
                        : <TouchableOpacity onPress={() => { navigation.navigate('EditProfile', { userProfileDetail: userProfileDetail }) }} >
                            <View style={styles.secViewStyle}>
                                {profileImage != null ?
                                    <Image source={{ uri: profileImage }} style={styles.profilepicStyle} />
                                    :
                                    <Image source={Images.Images.general.defaultUser} style={styles.profilepicStyle} />
                                }
                                <Text style={styles.textStyle}>{profileName}</Text>
                                <Icon name="chevron-right" size={30} color={Color.White} />
                            </View>
                        </TouchableOpacity>
                }
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
        height: 70,
        width: 70,
        borderRadius: 35,
        alignSelf: 'center',
        marginLeft: 8,
    },
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
        color: Color.White,
        padding: 10,
        width: '67%',
    }

})

export default Profile;
