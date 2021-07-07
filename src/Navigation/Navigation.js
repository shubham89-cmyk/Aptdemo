// import React, { useState } from "react";
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Authentication from "../screens/Authentication/Authentication";
// import Dashboard from "../screens/Dashboard/Dashboard";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ActiveOrders from "../screens/Dashboard/ActiveOrders";
// import UpCommingOrders from "../screens/Dashboard/UpCommingOrders";
// import UpComingDetail from "../screens/Dashboard/UpComingDetail";
// import ActiveDelivery from "../screens/ActiveDelivery/ActiveDelivery";
// import AcceptedOrder from "../screens/AcceptedOrder/AcceptedOrder";
// import Invoice from "../screens/ActiveDelivery/Invoice";
// import Feedback from "../screens/ActiveDelivery/Feedback";
// import History from "../screens/History/History";
// import Home from "../screens/Home/Home";
// import Setting from "../screens/Account/Setting";
// import Account from "../screens/Account/Account";
// import Earn from "../screens/Earn/Earn";
// import SplashScreen from "../screens/SplashScreen";
// console.disableYellowBox = true;

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// export function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen name="SplashScreen" component={SplashScreen}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={Authentication}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="UpCommingOrders" component={UpCommingOrders}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="UpComingDetail" component={UpComingDetail}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="ActiveDelivery" component={ActiveDelivery}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="AcceptedOrder" component={AcceptedOrder}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Invoice" component={Invoice}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Feedback" component={Feedback}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={Home}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Setting" component={Setting}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Account" component={Account}
//           options={{ headerShown: false }} />
//         <Stack.Screen name="Earn" component={Earn}
//           options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from "../screens/Authentication/Authentication";
import ForgotPassword from "../screens/Authentication/ForgotPassword";
import Otp from "../screens/Authentication/Otp";
import Dashboard from "../screens/Dashboard/Dashboard";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActiveOrders from "../screens/Dashboard/ActiveOrders";
import UpCommingOrders from "../screens/Dashboard/UpCommingOrders";
import UpComingDetail from "../screens/Dashboard/UpComingDetail";
import ActiveDelivery from "../screens/ActiveDelivery/ActiveDelivery";
import AcceptedOrder from "../screens/AcceptedOrder/AcceptedOrder";
import Invoice from "../screens/ActiveDelivery/Invoice";
import Feedback from "../screens/ActiveDelivery/Feedback";
import History from "../screens/History/History";
import Home from "../screens/Home/Home";
import Setting from "../screens/Account/Setting";
import Profile from "../screens/Account/Profile";
import EditProfile from "../screens/Account/EditProfile";
import ChangePassword from "../screens/Account/ChangePassword";
import PasswordUpdate from "../screens/Account/PasswordUpdate";
import Account from "../screens/Account/Account";
import Earn from "../screens/Earn/Earn";
import SplashScreen from "../screens/SplashScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color } from '../helper';
import { connect, useDispatch, useSelector } from "react-redux";

console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EarnTab = createStackNavigator();
const HistoryTab = createStackNavigator();

const HomeTab = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeTab.Navigator
    // initialRouteName="Invoice"
    >
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="AcceptedOrder"
        component={AcceptedOrder}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="ActiveDelivery"
        component={ActiveDelivery}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />

    </HomeTab.Navigator>
  );
}

const AccountTab = createStackNavigator();
function AccountStackScreen() {
  return (
    <AccountTab.Navigator>
      <AccountTab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <AccountTab.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <AccountTab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <AccountTab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <AccountTab.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <AccountTab.Screen
        name="PasswordUpdate"
        component={PasswordUpdate}
        options={{ headerShown: false }}
      />
    </AccountTab.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff5',
        style: {
          backgroundColor: Color.TheamCard,
          elevation: 25,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Home');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="home" size={28} color={color === '#fff' ? Color.TheamColor : "gray"} />
            </View>
          ),
        }}
        name="Home"
        style={{ fontSize: 20 }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Earn');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="bank" size={26} color={color === '#fff' ? Color.TheamColor : "gray"} />
            </View>
          ),
        }}
        name="Earn"
        component={Earn}
      />
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
          tabPress: e => {
            navigation.navigate('History');
          },
        })}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="list" size={26} color={color === '#fff' ? Color.TheamColor : "gray"} />
            </View>
          ),
        }}
        name="History"
        component={History}
      />
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Account');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="user" size={28} color={color === '#fff' ? Color.TheamColor : "gray"} />
            </View>
          ),
        }}
        name="Account"
        component={AccountStackScreen}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  // const loginData = useSelector(state => state.loginData)
  // console.log("App___loginData___Redux", loginData);
  const userToken = useSelector(state => state.userToken)
  // console.log("App___userToken___Redux", userToken);

  return (
    <Stack.Navigator
    // initialRouteName="SplashScreen"
    >
      {
        userToken == null ? (
          <>
            {/* {console.log("if_user_toekn_null______________")} */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Authentication}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
            <>
              {/* {console.log("else_user_toekn__________________")} */}
              <Stack.Screen
                name="Main"
                component={TabScreens}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )
      }

    </Stack.Navigator>
  )
}

export function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default connect()(App);
