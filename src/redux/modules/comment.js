import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/Firebase"
import { collection, getDocs, doc, where, orderBy, query } from "firebase/firestore";
import "moment";
import moment from "moment";


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
        console.log(list)
        dispatch(setComment(post_id, list));
    }
}


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {

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
};

export { actionCreators };