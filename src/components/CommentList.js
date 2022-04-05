import React from "react";
import Img from "../elements/Image";
import styled from "styled-components";

const CommentList = () => {
  return (
    <div>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
    </div>
  );
};

export default CommentList;


const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    return (
        <div>
            <Head>
                <Img shape="circle"/>
                <p>{user_name}</p>
                <p style={{marginLeft: "auto"}}>{insert_dt}</p>
            </Head>
            <div>
                <p>{contents}</p>
            </div>
        </div>
    )
}

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