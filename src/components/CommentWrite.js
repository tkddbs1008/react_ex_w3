import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


const CommentWrite = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {post_id} = props;
  console.log(post_id)
  function deletePost() {
    dispatch(postActions.deletePostFB(post_id))
    setTimeout(() => {nav("/")}, 1000);
  }

    return (
      <div>
        <div style={{display: "flex"}}>
          <input placeholder="댓글 내용을 입력해주세요 :)" />
          <button>작성</button>
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