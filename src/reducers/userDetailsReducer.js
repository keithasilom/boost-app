const userDetailsReducer = (state = {}, action) => {
    
    state = {
        UserImage : localStorage.getItem('user_image'),
        MyName : localStorage.getItem('user_full_name'),
        MyCloudId : localStorage.getItem('user_cloud_id'),
        MyEmail : localStorage.getItem('user_email')
    };

    switch (action.type) {
        case "SET_USER":
            return state = {
                UserImage : action.payload.UserImage,
                MyName : action.payload.MyName,
                MyCloudId : action.payload.MyCloudId,
                MyEmail : action.payload.MyEmail
            };
        default:
            return state
    }
};

export default userDetailsReducer;