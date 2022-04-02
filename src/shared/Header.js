import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const nav = useNavigate();
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