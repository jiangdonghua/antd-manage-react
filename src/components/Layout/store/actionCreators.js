import * as constants from './constants';



const changeResponse = (status) => ({
    type: constants.IS_MOBILE,
    status
});

export const Responsive = (status) => {
    return (dispatch) => {
        dispatch(changeResponse(status));
    }
}


// const ReadsStorageUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
// const storageUserInfo = (data) => ({
//     type: constants.LOAD_STORAGE_USER_INFO,
//     data
// });
// export const LoadUserInfo = () => {
//     return (dispatch) => {
//         dispatch(storageUserInfo(ReadsStorageUserInfo))
//     }
// }
