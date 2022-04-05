import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";
import { emailCheck } from "../shared/RegCheck";

const Login = (props) => {
    const nav = useNavigate()
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {


        if(id === "" || pwd === ""){
            window.alert("빈칸 채워라")
            return;
        }
        if(!emailCheck(id)){
            window.alert("이메일 형식이 틀림")
            return;
        }



        dispatch(userActions.loginFB(id, pwd));
        setTimeout(() => {nav("/")}, 1000);
    }
    return (
        <div>
            <div>
                <h1>로그인</h1>
                <div>
                    <p>ID</p>
                    <input placeholder="아이디를 입력해주세요"
                    onChange={(e) => {setId(e.target.value)}}
                    />
                </div>
                <div>
                    <p>PW</p>
                    <form>
                        <input type="password" placeholder="비밀번호를 입력해주세요"
                        onChange={(e) => {setPwd(e.target.value)}}/>
                    </form>
                </div>
                <button onClick={() => {login();}} >로그인</button>
            </div>
        </div>
    )
}

export default Login;