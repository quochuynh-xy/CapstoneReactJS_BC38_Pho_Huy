import types from "./const";
import { authServices } from "./Services/AuthServices"
export const loginAction = (data) => {
    return async (dispatch) => {
        try {
            const res = await authServices.login(data);
            dispatch({
                type: types.LOGIN,
                payload: res.data.content
            })
            localStorage.setItem("cyberfilmToken", res.data.content.accessToken)
        } catch (error) {
            console.log(error);
        }
    }
}
export const autoLogin = (userToken) => {
    return async (dispatch) => {
        if(!userToken) return
        try {
            const res = await authServices.autoFetchProfile(userToken);
            dispatch({
                type: types.LOGIN,
                payload: res.data.content
            })
        } catch (error) {
            localStorage.setItem("cyberfilmToken", "")
            console.log(error);
        }
    }
}