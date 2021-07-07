import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    SafeAreaView,
    PermissionsAndroid,
    ActivityIndicator
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from 'react-native-elements'
import { useNavigation, useIsFocused, useFocusEffect, useRoute } from '@react-navigation/native';
import { Color } from '../../helper';
import Images from '../../assets';
import Api from "../../services/AppApi";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from 'react-native-geolocation-service';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = (props) => {
    console.log("props___EditProfile", props);
    // console.log("userProfileDetail___", props.route.params.userProfileDetail);
    const { email, name, phone, } = props.route.params.userProfileDetail
    const { image_url } = props.route.params.userProfileDetail.profile_image
    const navigation = useNavigation();
    const userToken = useSelector(state => state.userToken)
    const isFocused = useIsFocused();
    const [user, setUser] = useState(name ? name : '')
    const [emailId, setEmailId] = useState(email ? email : '')
    const [num, setNum] = useState(phone ? phone : '')
    const [loading, setLoading] = useState(false)
    const [loadingImage, setLoadingImage] = useState(false)
    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const [currentimage, setCurrentImage] = useState(null)
    const [locationStatus, setLocationStatus] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [region, setRegion] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.05, longitudeDelta: 0.05 })

    useEffect(() => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(async (response) => {
            console.log("findCoordinates_response___", response)
            if (response) {
                Geolocation.getCurrentPosition((position) => {
                    console.log("position____111", position);
                    setCurrentLatitude(position.coords.latitude)
                    setCurrentLongitude(position.coords.longitude)
                    setLoading(false)
                },
                    error => {
                        if (error.code == 5 || error.code == 3) {
                            setLocationStatus(false)
                            setLoading(false)
                        }
                    }
                );
            } else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (granted == 'granted') {
                    setLoading(false)
                } else {
                    // alert('denied')
                    setLocationStatus(true)
                    setPermissionStatus(false)
                    setLoading(false)
                }
            }
        });
    }, [isFocused]);

    function _usrProfileUpdate(image) {
        console.log("image___", image);
        var name = image ? image.path.split('.') : null
        var filename = image ? name[name.length - 1] : null
        var data = new FormData()

        console.log("__data____", data);
        console.log("___userToken", userToken);
        setLoadingImage(true)
        data.append("profile_image", {
            uri: image.path,
            type: image.mime,
            name: 'driverProfile.' + filename
        })
        console.log("__data__", data)
        fetch('https://api.appetizar.io/api/user/profile_image',
            {
                method: 'POST',
                headers: {
                    'Authorization': userToken,
                    "Content-type": "multipart/form-data",
                },
                body: data
            }).then((result) => result.json())
            .then((res) => {
                console.log('API---------', res)
                setCurrentImage(res.data.profile_image.image_url)
                // alert("res___", res.error.message)
                setLoadingImage(false)
            })
            .catch(e => {
                console.log("eeee", e),
                    setLoadingImage(false)
            })
    }

    async function choosePhoto() {
        ImagePicker.openPicker({
            compressImageQuality: 0.5,
            includeBase64: true
        }).then(async image => {
            console.log("openPicker__image", image);
            _usrProfileUpdate(image)
        });
    }

    async function takePhoto() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log("openCamera__image", image);
            _usrProfileUpdate(image)
        });
    }

    function _choosePhotoAlert() {
        Alert.alert(
            "User Profile",
            "Choose from gallery.",
            [
                { text: 'Close', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: "Camera",
                    onPress: () => takePhoto(),
                },
                { text: "Gallery", onPress: () => choosePhoto() },
            ],
        );
    }

    function _SubmitEditDetails() {
        let filterEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (user == '' || emailId == '' || num == '') {
            alert('Please enter all details.')
        } else if (filterEmail.test(emailId) == false) {
            setError('Please enter valid email address.')
        } else {
            setLoading(true)
            try {
                let dataPass = {
                    name: user,
                    email: emailId,
                    userType: "driver",
                    phone: num,
                    location: {
                        type: "Point",
                        coordinates: [currentLatitude, currentLongitude]
                    }
                }
                console.log('dataPass_____SubmitEditDetails', dataPass, userToken)
                Api.patch('api/user/update', dataPass, userToken)
                    .then(async (res) => {
                        console.log('res__update', res)
                        if (res.code == 200) {
                            navigation.navigate('Profile')
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
        // navigation.navigate('Profile')
    }

    console.log("currentLatitude___", currentLatitude, "currentLongitude___", currentLongitude);

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor, }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>EditProfile</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>
                {
                    loadingImage ?
                        <ActivityIndicator color={Color.TheamColor} size="large" />
                        :
                        <TouchableOpacity onPress={() => _choosePhotoAlert()} style={{ marginTop: 35 }}>
                            {image_url != null ?
                                <Image source={{ uri: currentimage != null ? currentimage : image_url }} style={styles.profilepicStyle} />
                                :
                                <Image source={Images.Images.general.user}
                                    style={styles.profilepicStyle} />
                            }
                        </TouchableOpacity>
                }
                {/* {image?<ImagePick/>:null} */}
                <Text style={styles.nameTextStyle}>{user}</Text>
                {/* <Text style={styles.pointsTextStyle}>75 Points | Gold Member</Text> */}

                <View style={styles.inputView}>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={user}
                            onChangeText={setUser}
                            placeholder='Enter your User Name'
                            autoCapitalize='none'
                            returnKeyType='next'
                            placeholderTextColor={Color.White}
                            ref={ref_input1}
                            onSubmitEditing={() => ref_input2.current.focus()}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            value={emailId}
                            maxLength={50}
                            onChangeText={setEmailId}
                            keyboardType='email-address'
                            placeholder='Enter your Email'
                            placeholderTextColor={Color.White}
                            ref={ref_input2}
                            onSubmitEditing={() => ref_input3.current.focus()}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            value={num}
                            maxLength={13}
                            onChangeText={setNum}
                            keyboardType='numeric'
                            placeholder='Enter your Mobile No'
                            placeholderTextColor={Color.White}
                            ref={ref_input3}
                        />
                        {
                            loading ?
                                <ActivityIndicator color={Color.TheamColor} size="large" />
                                : <TouchableOpacity onPress={() => { _SubmitEditDetails() }} style={styles.buttonStyle}>
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
    profilepicStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    nameTextStyle: {
        color: Color.TheamColor,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    pointsTextStyle: {
        color: Color.White,
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputView: {
        backgroundColor: Color.TheamCard,
        width: '100%',
        marginVertical: 10
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
    }

})

export default EditProfile;
