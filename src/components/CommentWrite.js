import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const [comment_text, setCommentText] = React.useState('');

  const onChange = (e) => {
    setCommentText(e.target.value);
  }

  const write = () => {
    console.log(comment_text);
    dispatch(commentActions.addCommentFB(post_id, comment_text))
    setCommentText("");
  }
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {post_id} = props;
  function deletePost() {
    dispatch(postActions.deletePostFB(post_id))
    setTimeout(() => {nav("/")}, 1000);
  }

    return (
      <div>
        <div style={{display: "flex"}}>
          <input value={comment_text} onChange={onChange} placeholder="댓글 내용을 입력해주세요 :)" />
          <button onClick={write}>작성</button>
          {props.is_me && <Button onClick={deletePost}>게시글 삭제</Button>}
        </div>
      </div>
    );
}

const Button = styled.button`
display: flex;
align-self: center;
margin-left: auto;
margin-right: 15px;
`;


export default CommentWrite;