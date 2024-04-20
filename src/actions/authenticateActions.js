import { authenticateActions } from "../store/authenticateReducer";

function login(id, password){
    return (dispatch,getState)=>{
        //dispatch({type:"LOGIN_SUCCESS",payload:{id, password}})
        dispatch(authenticateActions.login({ id, password }))
    };
}

export default authenticateActions ={login}