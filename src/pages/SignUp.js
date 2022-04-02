import React from "react";
import styled from "styled-components";

const Signup = (props) => {
    return (
        <div>
            <div>
                <h1>회원가입</h1>
                <div>
                    <p>ID</p>
                    <input placeholder="아이디를 입력해주세요"/>
                </div>
                <div>
                    <p>Nickname</p>
                    <input placeholder="닉네임을 입력해주세요"/>
                </div>
                <div>
                    <p>PW</p>
                    <input placeholder="비밀번호를 입력해주세요" />
                    <br/>
                    <input placeholder="비밀번호를 다시 입력해주세요"/>
                </div>
                <button>회원가입하기</button>
            </div>
        </div>
    )
}

export default Signup;