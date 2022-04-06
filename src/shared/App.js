import React from "react";
import { Route, Routes} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import { history } from "../redux/configureStore";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Signup from "../pages/SignUp";
import Header from "./Header";
import {actionCreators as userActions} from "../redux/modules/user"
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { apiKey } from "./Firebase";
import Permit from "./Permit";
import styled from "styled-components";
import PostWrite from "../pages/PostWrite";
import { useNavigate } from "react-router-dom";
import PostDetail from "../pages/PostDetail";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import Notification from "../pages/Notification";


function App() {
  const dispatch = useDispatch();
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key) ? true : false;
  const nav = useNavigate();
  React.useEffect(() =>{
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
    // const docRef = doc(db, "post", "AgJDgksWCEMWXNeeLtWR");
    // deleteDoc(docRef)
  },);

  return (
        <div>
          <Header />
          <Routes>
            <Route path="/*" element={< Posts/>}/>
            <Route path="/login/*" element={<Login/>}/>
            <Route path="/Signup/*" element={<Signup/>}/>
            <Route path="/write/*" element={<PostWrite/>}/>
            <Route path="/write/:post_id/*" element={<PostWrite/>} />
            <Route path="/post/:id/*" element={<PostDetail/>}/>
            <Route path="/noti/*" element={<Notification/>}/>
          </Routes>
          <Permit>
            <Button onClick={() => nav("/write")}>+</Button>
          </Permit>
        </div>
  );
}

const Button = styled.button`
width: 50px;
height: 50px;
background-color: #212121;
color: #fff;
box-sizing: border-box;
font-size: 30px;
position: fixed;
bottom: 50px;
right: 16px;
border-radius: 25px;
`

export default App;
