import React from "react";
import Img from "../elements/Image";


const Post = (props) => {

        //left

        //right

        //bottom
    return (
        <div>
            <div>
                <div style={{display: "flex"}}>
                    <Img shape="circle" src={props.src} />
                    <p>{props.user_info.user_name}</p>
                    <p style={{marginLeft: "auto"}}>{props.insert_dt}</p>
                </div>
                <div>
                    <p>{props.contents}</p>
                </div>
                <div>
                    <Img shape="rectangle" src={props.src} />
                </div>
                <div>
                    <p>댓글{props.comment_cnt}개</p>
                </div>
            </div>
        </div>
    )
}

Post.defaultProps = {
    user_info: {
        user_name: "user1",
        user_profile: "https://www.clym.io/wp-content/uploads/2020/10/website-cookie.jpeg",
    },
    img_url: "https://www.clym.io/wp-content/uploads/2020/10/website-cookie.jpeg",
    contents: "맛있는 쿠키",
    comment_cnt: 10,
    insert_dt: "2021-04-01 10:00:00",
};

export default Post;