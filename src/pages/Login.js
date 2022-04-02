import React from "react";
import {setCookie} from "../shared/Cookie"
import styled from "styled-components";

const Login = (props) => {

    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');

    const changeId = (e) => {
        setId(e.target.value);
    }

    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const login = () => {
        setCookie("user_id", id, 3);
        setCookie("user_pwd", pwd, 3);
    }
    return (
        <div>
            <div>
                <h1>로그인</h1>
                <div>
                    <p>ID</p>
                    <input value={id} onChange={changeId} placeholder="아이디를 입력해주세요" />
                </div>
                <div>
                    <p>PW</p>
                    <input value={pwd} onChange={changePwd} placeholder="비밀번호를 입력해주세요"/>
                </div>
                <button onClick={() => {login();}} >로그인</button>
            </div>
        </div>
    )
}

export default Login;