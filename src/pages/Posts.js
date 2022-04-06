import React from "react";
import styled from 'styled-components'
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux"
import { actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";
import { useNavigate } from "react-router-dom";


const Posts = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);
    const user_info = useSelector((state) => state.user.user);

    React.useEffect(() => {
        if(post_list.length === 1){
            dispatch(postActions.emptyList())
        }
        if(post_list.length === 0){
                dispatch(postActions.getPostDB());
        }
    }, [post_list.length]);

    return (
        <div>
        <InfinityScroll
            callNext={() => {
                dispatch(postActions.getPostDB(paging.next));
            }}
            is_next={paging.next? true : false}
            loading={is_loading}
        >
            {post_list.map((el, idx) => {
                if(el.user_id === user_info?.uid){
                    return (
                    <div key={el.id} onClick={() => nav(`post/${el.id}`)}>
                        <Post {...el} is_me/>
                    </div>
                    )
                }else{
                    return (
                    <div key={el.id} onClick={() => nav(`post/${el.id}`)}>
                        <Post {...el}/>
                    </div>
                    )
                }
            })}
        </InfinityScroll>
        </div>
    );
}

export default Posts;