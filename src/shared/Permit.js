import React from "react";
import {useSelector} from "react-redux";
import { apiKey } from "./Firebase";

const Permit = (props) => {
    const is_login = useSelector(state => state.user.is_login)
    const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(session_key) ? true : false;

    if(is_session && is_login) {
         return <div> {props.children} </div>;
    }   return null;
}

export default Permit;