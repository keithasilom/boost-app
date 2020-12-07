const jsonTokenReducer = (state = '', action) => {
    switch (action.type) {
        case "TOKEN":
            return state = action.payload;
        default:
            return state
    }
};

export default jsonTokenReducer;