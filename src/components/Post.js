import React from "react";
import styled from "styled-components";
import Img from "../elements/Image";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
    const nav = useNavigate();
        //left

        //right

        //bottom
    return (
        <div>
            <div>
                <div style={{display: "flex"}}>
                    <Img shape="circle" src={props.src} />
                    <p>{props.user_name}</p>
                    <p style={{marginLeft: "auto"}}>{props.insert_dt}</p>
                </div>
                <div>
                    <p>{props.contents}</p>
                </div>
                <div>
                    <Img shape="rectangle" src={props.image_url} />
                </div>
                <div style={{display: "flex"}}>
                    <p>댓글{props.comment_cnt}개</p>
                    {props.is_me && <Button onClick={() => nav(`/write/${props.id}`)}>수정</Button>}
                </div>
            </div>
        </div>
    )
}

const Button = styled.button`
display: flex;
padding: 0px;
height: 20px;
align-self: center;
margin-left: auto;
margin-right: 15px;
`;

export default Post;