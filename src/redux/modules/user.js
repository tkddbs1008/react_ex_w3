import {createAction, handleActions} from "redux-actions"
import { setCookie, deleteCookie } from "../../shared/Cookie"
import {produce} from "immer"
import { browserSessionPersistence, setPersistence, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
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
const loginFB = (id, pw) => {
    return function (dispatch, getState) {

    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(auth, id, pw);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage)
        });


    signInWithEmailAndPassword(auth, id, pw)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
            setUser({
                id: id,
                pw: pw,
                user_name: user.displayName,
                uid: user.uid,
            }));
        // ...
        })
        .catch((error) => {
            console.log(error)
        });
    };
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState) {
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: user_name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then((user) => {
                    dispatch(
                        setUser({
                            user_name: user.displayName,
                            id: id,
                            user_profile: '',
                            uid: user.uid,
                        }));
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

const loginCheckFB = () => {
    return function (dispatch, getState) {
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(
                    setUser({
                    user_name: user.displayName,
                    user_profile: '',
                    id: user.email,
                    uid: user.uid,
                    })
                );
            }else{
                dispatch(logOut());
            }
        })
    }
}

const logOutFB = () => {
    return function (dispatch) {
        auth.signOut().then(() => {
            dispatch(logOut());
        })
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
    signupFB,
    loginFB,
    loginCheckFB,
    logOutFB,
};

export { actionCreators };