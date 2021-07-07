import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import Images from '../assets'
import { Color } from '../helper';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const SplashScreen = (props) => {
    const navigation = useNavigation();
    console.log("SplashScreen_props__", props);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        TimeOut();
    }, [])

    function TimeOut() {
        setTimeout(() => {
            // props.navigation.navigate('Login')
            navigation.navigate('Login')
        }, 3000);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.TheamColor }}>
            <Image source={Images.Images.AppIcon.Splashicon}
                style={{ height: '70%', width: "80%" }}
                resizeMode='contain'
            />
        </View>
    );
};

export default SplashScreen;