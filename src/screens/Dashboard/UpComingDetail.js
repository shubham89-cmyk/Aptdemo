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
import { Color } from '../../helper';
import Images from '../../assets'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UpComingDetail = (props) => {
    console.log("props__UpComingDetail", props);
    console.log("props__item", props.route.params.item);
    const { Price, Address, name, order } = props.route.params.item
    const navigation = useNavigation();
    const [accept, setAccept] = useState(false)

    return (
        <SafeAreaView>
            {/* header ....... */}
            <View style={{ backgroundColor: Color.TheamCard, width: '100%', height: '7%', paddingTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>

                <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Upcoming Order Details</Text>
                </View>

                <View style={{ width: '10%', height: '100%' }}></View>
            </View>

            <View style={styles.authView}>

                <View style={styles.mainViewStyle}>
                    <View style={styles.firestViewStyle}>
                        <Image
                            source={Images.Images.food.pizzaOne}
                            style={styles.imageStyle}
                        />
                    </View>
                    <View style={styles.secondViewStyle}>
                        <Text style={styles.textStyle}>{name}</Text>
                        <Text style={styles.orderText}>{order}</Text>
                    </View>
                    <View style={styles.thirdViewStyle}>
                        <Text style={[styles.priceText]}>{'\u20B9' + Price}</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon name='phone' type='feather' color={Color.TheamColor} size={25} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <View style={{ width: '70%', marginTop: 10 }}>
                        <Text style={styles.AddressText}>{Address}</Text>
                        <Text style={[styles.orderText, { color: Color.TheamColor }]}>waitting for Accept.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: '30%' }}>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon name='map' type='feather' color={Color.TheamColor} size={25} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.TabContainer}>
                    <TouchableOpacity
                        style={[styles.tabView, { backgroundColor: Color.TheamCard }]}
                        onPress={() => { setActiveOrder(false), setUpComming(true) }}>
                        <Text style={styles.tabText} >Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabView, { backgroundColor: Color.TheamCard }]}
                        onPress={() => { setActiveOrder(true), setUpComming(false) }}>
                        <Text style={styles.tabText} >Reject</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    authView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: Color.TheamBlack
    },
    textStyle: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        color: Color.White
    },
    container: {
        flex: 1,
        backgroundColor: Color.TheamBlack,
        paddingBottom: 5,
        alignItems: 'center',
    },
    TabContainer: {
        position: 'absolute',
        bottom: '13%',
        width: '98%',
        marginBottom: 10,
        flexDirection: 'row',
    },
    tabText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
    tabView: {
        padding: 15,
        justifyContent: 'center',
        flex: 0.5,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 2
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.White
    },
    orderText: {
        fontWeight: 'bold',
        color: Color.White,
        marginTop: 10
    },
    AddressText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: Color.White
    },
    priceText: {
        color: Color.White,
        fontWeight: 'bold'
    },
    mainViewStyle: {
        flexDirection: 'row',
        width: '100%',
    },
    firestViewStyle: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondViewStyle: {
        width: '60%'
    },
    thirdViewStyle: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    iconStyle: {
        marginTop: 5
    }
})

export default UpComingDetail;