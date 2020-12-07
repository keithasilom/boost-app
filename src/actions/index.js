export const setUserDetails = (details) => {
    return {
        type: "SET_USER",
        payload: details
    }
};

export const setLoginFlag = (details) => {
    return {
        type: "SIGN_IN",
        payload: details
    }
};

export const setPayPeriod= (details) => {
    return {
        type: "SET_PAY_PERIOD",
        payload: details
    }
};