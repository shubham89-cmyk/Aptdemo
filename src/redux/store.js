import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer } from './reducers';
import { createLogger } from 'redux-logger'
const logger = createLogger({});
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, {}, applyMiddleware(logger));
export const persistor = persistStore(store);