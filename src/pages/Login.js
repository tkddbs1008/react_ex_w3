import React from "react";
import styled from "styled-components";

const Login = (props) => {
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
                <button>로그인</button>
            </div>
        </div>
    )
}

export default Login;