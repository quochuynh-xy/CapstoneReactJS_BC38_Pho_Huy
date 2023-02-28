import produce from "immer";
import { adminTypes } from "./utils/const";

const initState = {
    filmDetail: {}
}

const reducer = (state = initState , {payload, type}) => {
    return produce(state , (draft)=> {
        if( type === adminTypes.FETCH_MOVIE_DETAIL ) {
            draft.filmDetail = payload
        }
    })
}

export default reducer