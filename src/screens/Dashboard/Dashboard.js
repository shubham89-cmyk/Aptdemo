import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import UpCommingOrders from './UpCommingOrders';
import ActiveOrders from './ActiveOrders';
import { Color } from '../../helper';
import Api from "../../services/AppApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dashboard = (props) => {
  const navigation = useNavigation();
  const [upComming, setUpComming] = useState(false)
  const [activeOrder, setActiveOrder] = useState(true)
  const [loading, setLoading] = useState(true);
  // const [initialRoute, setInitialRoute] = useState('Home');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.StatusBarColor }}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Orders</Text>
        {/* Tab.............. */}
        <View style={styles.TabContainer}>
          <TouchableOpacity
            style={[styles.tabView, { backgroundColor: upComming ? Color.TheamColor : Color.TheamCard }]}
            onPress={() => { setActiveOrder(false), setUpComming(true) }}
          >
            <Text style={styles.tabText} >UpComming Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabView, { backgroundColor: activeOrder ? Color.TheamColor : Color.TheamCard }]}
            onPress={() => { setActiveOrder(true), setUpComming(false) }}
          >
            <Text style={styles.tabText} >Active Order</Text>
          </TouchableOpacity>
        </View>

        {
          upComming &&
          <UpCommingOrders />
        }
        {
          activeOrder &&
          <ActiveOrders />
        }

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default Dashboard;