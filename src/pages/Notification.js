import React from "react";
import Img from "../elements/Image";
import Card from "../components/Card";

const Notification = (props) => {
    let noti = [{user_name: "Kek", post_id: "post1", image_url:""},
                {user_name: "Kek", post_id: "post2", image_url:""}
                ]
    return (
        <div>
            <div>
                {noti.map((n) => {
                    return (
                        <Card key={n.post_id} {...n} />
                    )
                })}
            </div>
        </div>
    )
}

export default Notification;