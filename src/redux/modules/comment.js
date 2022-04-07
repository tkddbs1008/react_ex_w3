import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/Firebase"
import { collection, getDocs, getDoc, where, orderBy, query, addDoc, increment, updateDoc, doc } from "firebase/firestore";
import "moment";
import moment from "moment";
import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return async function (dispatch, getState) {
    const commentDB = collection(db, "comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss")
    }

    await addDoc(commentDB, comment).then(async (docs) => {
      const docRef = doc(db, "post", `${post_id}`)
      const post = getState().post.list.find(l => l.id === post_id);

      const inc = increment(1);

      comment = {...comment, id: docs.id};

      await updateDoc(docRef, {comment_cnt: inc}).then(() => {
        dispatch(addComment(post_id, comment));

        if(post){
            dispatch(postActions.editPost(post_id,{comment_cnt: parseInt(post.comment_cnt) + 1 }))
        }

      })
    })
  }
}

const getCommentFB = (post_id) => {
    return async function(dispatch, getState){
        if(!post_id){
            return;
        }

        const commentDB = collection(db, "comment");
        const q = query(commentDB, where("post_id", "==", post_id), orderBy("insert_dt", "desc"))
        const comments = await getDocs(q);
        let list = [];
        comments.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        dispatch(setComment(post_id, list));
    }
}


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
      [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };