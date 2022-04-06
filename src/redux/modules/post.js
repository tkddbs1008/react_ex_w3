import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import {db, storage} from "../../shared/Firebase"
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, startAt } from "firebase/firestore";
import "moment";
import moment from "moment";
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { actionsCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST"
const DELETE_POST = "DELETE_POST"
const LOADING = "LOADING"
const LOAD_POST = "LOAD_POST"
const EMPTY = "EMPTY"

const empty = createAction(EMPTY, (post) => ({post}))
const loadPost = createAction(LOAD_POST, (post) => ({post}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));



const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

const emptyList = () => {
    return async function (dispatch, getState) {
        let postList = getState().post
        await dispatch(empty(postList))
        };
    }



// middleware
const getPostDB = (start = null, size = 3) => {
    return async function (dispatch, getState) {

        let _paging = getState().post.paging;

        if (_paging.start && !_paging.next) {
            return;
        }

        dispatch(loading(true));
        const postDB = collection(db, "post");
        let q = query(postDB, orderBy("insert_dt", "desc"), limit(size + 1));

        if(start){
           q = query(postDB, orderBy("insert_dt", "desc"), limit(size + 1), startAt(start));
        }
        const getQ = await getDocs(q);
            let post_list = []
            let paging = {
                start: getQ.docs[0],
                next: getQ.docs.length === size+1? getQ.docs[getQ.docs.length-1] : null,
                size: size,
            }
        getQ.forEach((doc) => {
            let _post = doc.data();
            let post = Object.keys(_post).reduce((a, b) => {

                    return {...a, [b]:_post[b]};
                },
                {id: doc.id}
            );
                post_list.push(post)
        });
            post_list.pop();
            dispatch(setPost(post_list, paging));
    }

}

const loadOneFB = (id) => {
    return async function (dispatch) {
        const docRef = doc(db, "post", `${id}`);
        const docs = await getDoc(docRef);
        let _post = docs.data()
        let post = Object.keys(_post).reduce((a, b) => {

                    return {...a, [b]:_post[b]};
                },
                {id: id}
            );
            dispatch(loadPost(post)
            )
        };
    }

const addPostFB = (contents) => {
    return function (dispatch, getState) {
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile
        };
        const _post = {
            comment_cnt: 0,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const _image = getState().image.preview;
        const storageRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);
        uploadString(storageRef, _image, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
            return url;
        }).then(async (url) => {
            const docRef = await addDoc(collection(db, "post"), {
                ...user_info, ..._post, image_url: url
            });
            const post = await getDoc(docRef);
            const post_data = {id: post.id, ...post.data()}
            console.log(post_data)
            dispatch(addPost(post_data))
            dispatch(imageActions.setPreview(null));
        })
        }
    )}
}

const editPostFB = (post_id = null, post = {}) => {
    return async function (dispatch, getState) {
        if(!post_id){
            console.log("?")
            return;
        }

        const _image = getState().image.preview;
        const _post_idx = getState().post.list.findIndex(p => p.id === post_id)
        const _post = getState().post.list[_post_idx]
        const docRef = doc(db, "post", post_id)
        if(_image === _post.image_url){
            await updateDoc(docRef, {...post}).then(() => {
                dispatch(editPost(post_id, {...post}));
            });
        } else {
            const user_id = getState().user.user.uid
            const storageRef = ref(storage, `images/${user_id}_${new Date().getTime()}`);
        uploadString(storageRef, _image, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
            return url;
        }).then(async (url) => {
            await updateDoc(docRef, {...post, image_url: url}).then(() => {
                dispatch(editPost(post_id, {...post, image_url: url}));
            });
        })
        })
}}}

const deletePostFB = (post_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "post", post_id);
        await deleteDoc(docRef);

        dispatch(deletePost(post_id))
    }
}

export default handleActions(
    {
        [EMPTY]: (state, action) => produce(state, (draft) => {
            draft.list.pop()
        }),
        [LOAD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload.post);
        }),
        [SET_POST]: (state, action) => produce(state, (draft) => {

            draft.list.push(...action.payload.post_list);
            draft.paging = action.payload.paging;
            draft.is_loading = false;
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        }),
        [LOADING]: (state, action) => produce(state, (draft) => {
                draft.is_loading = action.payload.is_loading;
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

            draft.list[idx] = {...draft.list[idx], ...action.payload.post}
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            draft.list = draft.list.filter((l) => l.id !== action.payload.post_id);
        }),
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostDB,
    addPostFB,
    editPostFB,
    loadOneFB,
    emptyList,
    deletePostFB,
}

export {actionCreators}
