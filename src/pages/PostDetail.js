import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PostDetail = (props) => {
    const nav = useNavigate();
    const param = useParams();
    const id = param.id;
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    const user_info = useSelector((state) => state.user.user);
    console.log(post)



    return (
        <div>
            <Post {...post} is_me={post.user_id === user_info.uid}/>
            {props.is_me && <Button onClick={() => nav(`/write/${props.id}`)}>수정</Button>}
            <CommentWrite/>
            <CommentList/>
        </div>
    )
}

const Button = styled.button`
display: flex;
padding: 0px;
height: 20px;
align-self: center;
`;

export default PostDetail;