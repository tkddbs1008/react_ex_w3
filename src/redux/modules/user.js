import {createAction, handleActions} from "redux-actions"
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie"
import {produce} from "immer"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../shared/Firebase"


//action
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"
const SET_USER = "SET_USER"

//action creators
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));

//initialState
const initialState = {
    user: null,
    is_login: false,
};

//middleware actions
const loginAction = (user) => {
    return function (dispatch, getState) {
        dispatch(setUser(user));
    }
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState) {
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: user_name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                    dispatch(setUser({user_name: user_name, id: id, user_profile: ''}));
                // Profile updated!
                // ...
                }).catch((error) => {
                    console.log(error)
                // An error occurred
                // ...
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage)
            // ..
        });
    }
}

//reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

// action creator export
const actionCreators = {
    setUser,
    logOut,
    getUser,
    loginAction,
    signupFB,
};

export { actionCreators };