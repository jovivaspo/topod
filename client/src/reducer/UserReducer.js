import { REGISTER, LOGIN, LOGOUT } from "../types";


const UserReducer = (state={},action) =>{
    switch(action.type){
        case REGISTER : {
            return {userInfo:action.payload}
        }
        case LOGIN : {
            return {userInfo:action.payload}
        }
        case LOGOUT : {
            return {userInfo:null}
        }
        default:
            return state
    }
}

export {UserReducer}