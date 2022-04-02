import React from "react";
import {setCookie} from "../shared/Cookie"
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const login = () => {
        dispatch(userActions.setUser({user_name: 'sam'}));
        nav("/")
    }
    return (
        <div>
            <div>
                <h1>로그인</h1>
                <div>
                    <p>ID</p>
                    <input placeholder="아이디를 입력해주세요" />
                </div>
                <div>
                    <p>PW</p>
                    <input placeholder="비밀번호를 입력해주세요"/>
                </div>
                <button onClick={() => {login();}} >로그인</button>
            </div>
        </div>
    )
}

export default Login;