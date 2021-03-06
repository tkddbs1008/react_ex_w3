import React from "react";
import Img from "../elements/Image";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {

    const dispatch = useDispatch();
    const {post_id} = props;
    const comment_list = useSelector((state) => state.comment.list);
    React.useEffect(() => {
       if(!comment_list[post_id]){
           dispatch(commentActions.getCommentFB(post_id))
       }
    }, [])

    if(comment_list[post_id])
  return (
    <div>
        {comment_list[post_id].map(c => {
            return <CommentItem key={c.id} {...c}/>
        })}
    </div>
  );
};

export default CommentList;


const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    return (
        <div style={{margin: "10px 0px 10px 0px"}}>
        <Comment>
            <Head>
                <Img shape="circle"/>
                <p>{user_name}</p>
                <p style={{marginLeft: "auto"}}>{insert_dt}</p>
            </Head>
            <div>
                <p>{contents}</p>
            </div>
        </Comment>
        </div>

    )
}

const Comment = styled.div`
background: #EBF4FA;
padding: 10px;
border: 1px solid #D6E9F5;
border-radius: 10px
`;

const Head = styled.div`
display: flex;
`;

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "mean0",
    user_id: "",
    post_id: 1,
    contents: "귀여운 고양이네요!",
    insert_dt: '2021-01-01 19:00:00'
}