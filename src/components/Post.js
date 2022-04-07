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
            <PostBox>
                <div style={{display: "flex"}}>
                    <Img shape="circle" src={props.src} />
                    <p style={{marginLeft: "5px"}}><b>{props.user_name}</b></p>
                    <p style={{marginLeft: "auto"}}>{props.insert_dt}</p>
                </div>
                <div>
                    <Img shape="rectangle" src={props.image_url} />
                </div>
                <CommentBox>
                    <P>댓글{props.comment_cnt}개</P>
                    {props.is_me && <EditBtn onClick={() => nav(`/write/${props.id}`)}>수정</EditBtn>}
                </CommentBox>
                <div>
                    <Content>{props.contents}</Content>
                </div>
            </PostBox>
        </div>
    )
}
const CommentBox = styled.div`
display: flex;
`;

const P = styled.p`
font-size: 12px;
margin: 0px;
align-self: center;
`;

const Content = styled.p`
margin: 10px 0px 0px 5px;
`;
const PostBox = styled.div`
margin: 10px auto;
width: 60%;
min-width: 280px;
border: 2px solid;
padding: 10px 10px 50px 10px;

`;

const EditBtn = styled.button`
display: flex;
padding: 0px;
align-self: center;
margin-left: auto;
background-color: white;
color: black;
border: 1px solid
`;

export default Post;
