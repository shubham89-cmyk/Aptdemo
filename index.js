// // import 'react-native-gesture-handler';
// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './src/Navigation/Navigation';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);
////////////////////////
/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/Navigation/Navigation';
import React from 'react'
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/redux/store";

const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Main);
