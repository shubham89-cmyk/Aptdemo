import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from "react-native";
import { Icon } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';

const windowWidth = Dimensions.get('window').width;
const Orders = [
    { name: 'DJ Food Store', order: 'Order No #123', Price: '800', AddressFrom: 'Shop No. 1 to 5, Premji Nagar, opp. Mahalaxmi Juice Center, near Gujarat Gas Circle, Adajan, Surat', AddressTo: '24, Ishwarlal Gulabbhai Desai Road, Abhinav Park Society, Athwa, Surat, Gujarat 395008' },
]

const UpcomingOrderMap = () => {
    const navigation = useNavigation();
    const origin = { latitude: 21.15103984640006, longitude: 72.77434764651416, };
    const destination = { latitude: 21.160031296166828, longitude: 72.79727935435226 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyATsQuZCY6bq0JIgpkW6HTOnSBsCSrS0ug';

    return (
        <View style={styles.authView}>
            {/* <Text style={{ color: '#fff' }}>Map</Text> */}
            <MapView
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 21.15019984640006,
                    longitude: 72.77434764651416,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{ latitude: 21.15103984640006, longitude: 72.77434764651416 }} >
                    <Image
                        source={Images.Images.AppIcon.loginScreen}
                        style={{ marginBottom: 10, width: 50, height: 45 }}
                        resizeMode="contain"
                    />
                </Marker>

                {console.log("origin__", origin, "destination__", destination)}

                {/* <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="hotpink"
                /> */}

                <Marker
                    coordinate={{ latitude: 21.160031296166828, longitude: 72.79727935435226 }} >
                    <Image
                        source={Images.Images.general.userLocation}
                        style={{ marginBottom: 10, width: 50, height: 45 }}
                        resizeMode="contain"
                    />

                </Marker>
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Color.TheamBlack,
        paddingBottom: 5,
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    authView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: Color.TheamBlack
    },
})

export default UpcomingOrderMap;