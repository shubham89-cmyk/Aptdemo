export function USER_LOGIN(res) {
    return { type: 'USER_LOGIN', res };
}

export function LOG_OUT() {
    return { type: 'LOG_OUT' };
}

export function USER_TOKEN(res) {
    return { type: 'USER_TOKEN', res };
}

export function USER_COUNTRY_DETAIL(res) {
    return { type: 'USER_COUNTRY_DETAIL', res };
}

export function DRIVER_ACTIVE_ORDER(res) {
    return { type: 'DRIVER_ACTIVE_ORDER', res };
}

export function FIREBASE_TOKEN(res) {
    return { type: 'FIREBASE_TOKEN', res };
}

// export function USER_PROFILE(res) {
//     return { type: 'USER_PROFILE', res };
// }
