import React from "react";
import Img from "../elements/Image";

const Card = (props) => {
    const {image_url, user_name, post_id} = props;
    return (
        <div style={{padding: "15px", backgroundColor: "#EFF6FF"}}>
            <div style={{display: "flex", border: "1px solid", backgroundColor: "white", padding: "15px"}}>
                <Img image_url={image_url}/>
                <p style={{marginLeft: "5px"}}>
                    <b>{user_name}</b> 님이 게시글에 댓글을 남겼습니다
                </p>
            </div>
        </div>
    )
}

export default Card;