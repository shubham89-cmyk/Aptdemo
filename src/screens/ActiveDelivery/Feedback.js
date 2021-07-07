import React, { useState } from "react";
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
} from "react-native";
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { Color } from '../../helper';
import Images from '../../assets';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feedback = (props) => {
    const navigation = useNavigation();
    console.log("props__Invoice", props);
    const [comment, setComment] = useState('')

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:Color.StatusBarColor }}>
            {/* header ....... */}
            <View style={styles.headrMainView}>
                <TouchableOpacity style={styles.headrBack}
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" size={30} color={Color.White} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
                <View style={styles.headerSecondView}>
                    <Text style={styles.headerText}>Feedback</Text></View>
                <View style={styles.headerView}></View>
            </View>

            <View style={styles.ViewStyle}>

                <TouchableOpacity>
                    <Image source={Images.Images.icon}
                        style={styles.profilepicStyle}
                        resizeMode='contain' />
                </TouchableOpacity>

                <Text style={styles.nameTextStyle}>User Name</Text>

                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                    defaultRating={[]}
                    size={30} />

                <View style={styles.commentView}>
                    <Text style={styles.commentTextStyle}>Comments:</Text>
                    <TextInput
                        style={styles.writeTextStyle}
                        placeholder='Write your comment here'
                        value={comment}
                        onChangeText={setComment}
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor={Color.White} />
                </View>

                <View style={styles.lastViewStyle}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Home") }}>
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
    },
    buttonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.White,
    },
    lastViewStyle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    profilepicStyle: {
        height: 100,
        width: 100,
        top: 35,
        borderRadius: 50
    },
    nameTextStyle: {
        color: Color.White,
        marginTop: 40,
        fontSize: 18,
        fontWeight: 'bold'
    },
    commentView: {
        backgroundColor: Color.TheamCard,
        height: windowHeight * 0.2,
        width: windowWidth,
        top: 10
    },
    commentTextStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Color.White,
        paddingLeft: 10,
        paddingTop: 5
    },
    writeTextStyle: {
        paddingLeft: 10,
        width: windowWidth,
        height: windowHeight * 0.1,
        color: Color.White
    }

})

export default Feedback;