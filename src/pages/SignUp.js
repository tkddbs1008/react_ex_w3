import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user"
import {useNavigate} from "react-router-dom"


const Signup = (props) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwd_check, setPwdCheck] = React.useState("");
    const [user_name, setUserName] = React.useState("");

    function signup() {
        if(id === "" || pwd === "" || user_name === ""){
            return;
        }
        if(pwd !== pwd_check){
            return;
        }
        dispatch(userActions.signupFB(id, pwd, user_name));
        setTimeout(nav("/"), 2000);
    }


    return (
        <div>
            <div>
                <h1>회원가입</h1>
                <div>
                    <p>ID</p>
                    <input
                    placeholder="아이디를 입력해주세요"
                    onChange={(e) => {setId(e.target.value)}}
                    />
                </div>
                <div>
                    <p>Nickname</p>
                    <input
                    placeholder="닉네임을 입력해주세요"
                    onChange={(e) => {setUserName(e.target.value)}}
                    />
                </div>
                <div>
                    <p>PW</p>
                    <input
                    placeholder="비밀번호를 입력해주세요"
                    onChange={(e) => {setPwd(e.target.value)}}
                    />
                    <br/>
                    <input
                    placeholder="비밀번호를 다시 입력해주세요"
                    onChange={(e) => {setPwdCheck(e.target.value)}}
                    />
                </div>
                <button onClick={signup}>회원가입하기</button>
            </div>
        </div>
    )
}

export default Signup;