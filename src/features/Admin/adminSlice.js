import produce from "immer";
import { adminTypes } from "./utils/const";

const initState = {
    filmDetail: {},
    userDetail: {}
}

const reducer = (state = initState , {payload, type}) => {
    return produce(state , (draft)=> {
        if( type === adminTypes.FETCH_MOVIE_DETAIL ) {
            draft.filmDetail = payload
        }
        if(type === adminTypes.FETCH_USER_PAGINATION){
            draft.userDetail = payload
        }
    })
}

export default reducer