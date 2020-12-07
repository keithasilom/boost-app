export const payPeriodReducer = (
    state = {
        periodFrom: "",
        periodTo: "",
        payDate: "",
    }, action) => {
    
    switch (action.type) {
        case "SET_PAY_PERIOD":
            return state = {
                periodFrom: action.payload.periodFrom,
                periodTo: action.payload.periodTo,
                payDate: action.payload.payDate
            };
        default:
            return state
    }
};