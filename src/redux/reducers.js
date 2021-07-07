import { REHYDRATE } from "redux-persist";


let initState = {
    loginData: {},
    userToken: null,
    // userProfileData: {},
    userCountryDetail: null,
    driverActiveOrder: [],
    firbaseToken: null
};

function ApptizerReducers(state = initState, action) {
    // console.log("Reducers__", action.res)
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                loginData: action.res,
            };
        case 'LOG_OUT':
            return {
                ...state,
                loginData: {},
                userToken: null,
                // userProfileData: {},
                userCountryDetail: null,
                driverActiveOrder: [],
                firbaseToken: null
            };
        case 'USER_TOKEN':
            return {
                ...state,
                userToken: action.res,
            };
        case 'USER_COUNTRY_DETAIL':
            return {
                ...state,
                userCountryDetail: action.res,
            };
        case 'DRIVER_ACTIVE_ORDER':
            return {
                ...state,
                driverActiveOrder: action.res,
            };
        case 'FIREBASE_TOKEN':
            return {
                ...state,
                firbaseToken: action.res,
            };
        // case 'USER_PROFILE':
        //     return {
        //         ...state,
        //         userProfileData: action.res,
        //     };
        case REHYDRATE:
            return {
                ...state,
                loginData: action.payload && action.payload.loginData ? action.payload.loginData : {},
            };
        default:
            return {
                ...state
            }

    }
}

export const reducer = ApptizerReducers;
