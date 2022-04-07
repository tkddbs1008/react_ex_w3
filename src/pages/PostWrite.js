import React from "react";
import Img from "../elements/Image";
import styled from "styled-components";
import _ from "lodash"
import Upload from "../shared/Upload";
import {useNavigate, useParams} from "react-router-dom"

import {useSelector, useDispatch} from "react-redux"
import {actionCreators as postActions} from "../redux/modules/post"
import { actionsCreators as ImageActions } from "../redux/modules/image";


const PostWrite = (props) => {
     const debounce = _.debounce((e) => {
        setContents(e.target.value);
    }, 800);

    const keyPress = React.useCallback(debounce, []);
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview)
    const nav = useNavigate();
    const dispatch = useDispatch();

    const param = useParams()
    const post_id = param.post_id;
    const is_edit = post_id? true : false;
    const post_list = useSelector((state) => state.post.list);
    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;


    React.useEffect(() => {
        if(is_edit && !_post){
            console.log('포스트 정보 없다')
            nav('/')

            return;
        }

        if(is_edit){
            dispatch(ImageActions.setPreview(_post.image_url));
        }
    }, [])

    const [contents, setContents] = React.useState("");

    function addPost() {
        dispatch(postActions.addPostFB(contents));
        setTimeout(() => {nav("/")}, 1000);
    }

    const changeContents = (e) => {
        keyPress(e);
    }

    function editPost() {
        dispatch(postActions.editPostFB(post_id,{contents: contents}))
        setTimeout(() => {nav("/")}, 1000);
    }

    if(!is_login) {
        return (
            <div>
                <p>회원만 쓸 수 있어</p>
                <button onClick={() => nav("/")}>메인 페이지로</button>
            </div>
        )
    }
    return (
        <div style={{width: "60%", margin: "auto"}}>
            <div>
                <h1>{is_edit ? "게시글 수정" : "게시글 작성"}</h1>
                <Upload/>
            </div>
            <div>
                <h1>미리보기</h1>
                <Img shape="rectangle" src={preview ? preview : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} />
            </div>
            <div>
                <p>게시글 내용</p>
                <InputBox onChange={changeContents} rows="5" placeholder="게시글 작성"/>
            </div>
            {is_edit? (
                <button onClick={editPost}>수정하기</button>
            ) : (
                <button onClick={addPost}>작성하기</button>
            )}
        </div>

    )
}

const InputBox = styled.textarea`
width: 100%
`;

export default PostWrite;