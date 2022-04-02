import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {getCookie, deleteCookie} from '../shared/Cookie'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    if(is_login) {
        return (
            <Headers>
                <h1 onClick={() => nav('/')}>홈페이지</h1>
                <ButtonBox>
                    <Button style={{marginRight:"5px"}}>내 정보</Button>
                    <Button style={{marginRight:"5px"}}>알림</Button>
                    <Button onClick={() => {dispatch(userActions.logOut({}))}}>로그아웃</Button>
                </ButtonBox>
            </Headers>
        );
    }


    return (
        <Headers>
            <h1 onClick={() => nav('/')}>홈페이지</h1>
            <ButtonBox>
                <Button style={{marginRight:"5px"}} onClick={() => nav("/login")}>로그인</Button>
                <Button onClick={() => nav("/Signup")}>회원가입</Button>
            </ButtonBox>
        </Headers>
    )
}

const Headers = styled.div`
display: inline-box;
width: 100%;
`;
const ButtonBox = styled.div`
margin-Left: auto;
display: flex;
align-items: center;
`;
const Button = styled.button`
`;
export default Header;