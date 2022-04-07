import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Spinner from "../elements/Spinner";
import styled from "styled-components";
const PostDetail =  (props) => {
    const dispatch = useDispatch();
    const param = useParams();
    const id = param.id;
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    const user_info = useSelector((state) => state.user.user);
    const comment_cnt = post?.comment_cnt;

    React.useEffect(()=> {
        if(post){
            return;
        }
            dispatch(postActions.loadOneFB(id))
    }, [])

    if(!post && !comment_cnt){
        return(
            <Spinner size="200"></Spinner>
        )
    }

    return (
        <div style={{width: "65%", margin: "auto"}}>
            <Post {...post} comment_cnt={comment_cnt} is_me={post.user_id  === user_info?.uid}/>
            <CommentBox>
            <CommentWrite post_id={id} is_me={post.user_id  === user_info?.uid}/>
            <CommentList post_id={id}/>
            </CommentBox>
        </div>
    )
}

const CommentBox = styled.div`
width: 70%;
border: 2px solid black;
margin: 10px auto;
padding: 10px;
`;

export default PostDetail;