import React, { Component, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // 仮置きサンプル
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // authentication code
import "firebase/compat/firestore"; // firestore access
import "../DB/firebase";
import { MyPage } from "./MyPage";
import { Map } from "./Map";
import { Place } from "./Place";
import { Home } from "./Home";
import { setLoginUser, deleteLoginUser, mapList } from "../actions";
import "./../CSS/App.css";

const userSelector = (state: any) => state.StoreState.loginUser;

function Content() {
  const history = useHistory();

  const linkTop = () => {
    history.push("/home");
  };

  return <div onClick={linkTop}>Map-App</div>;
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  console.log(user);
  // console.log(user.displayName);

  const login = () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(google_auth_provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const setUser = (user: any) => {
    dispatch(setLoginUser(user));
  };
  const deleteUser = () => {
    dispatch(deleteLoginUser());
  };

  const mapLists = (user: any) => {
    let mapItem: any = [];
    // console.log(user.uid);
    // console.log(firebase);
    
    
    firebase
      .firestore()
      .collection(`users/${user.uid}/Lists`)
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        
        if (snapshot.empty) {
          firebase
            .firestore()
            .collection(`users/${user.uid}/Lists`)
            .add({
              name:"",
              addNumber: "",
              address: "",
              latitude: "",
              longitude: "",
              image: "",
            })
            .then((doc) => {
              mapItem.push({
                id: doc.id,
                name:"",
                addNumber: "",
                address: "",
                latitude: "",
                longitude: "",
                image: "",
              });
            });
        }
        // console.log(mapItem);
        // console.log('bbb');
        
        
        snapshot.forEach((doc) => {
          // if (doc.data().status === 0) {
            mapItem.push({ ...doc.data(), id: doc.id });
          // }
        });
        // console.log(mapItem);
        
        dispatch(mapList(mapItem));
      });
      
  };

  const setList = () => {
    let mapItem:any = []
    mapItem.push({
      name:"",
      addNumber: "",
            address: "",
            latitude: "",
            longitude: "",
            image:"",
    })
    dispatch(mapList(mapItem))
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        mapLists(user)
        // console.log(user);
      } else {
        deleteUser();
        setList();
      }
    });
  }, []);

  const Logbutton = () => {
    if (user) {
      return <button onClick={logout}>ログアウト</button>;
    } else {
      return <button onClick={login}>ログイン</button>;
    }
  };

  return (
    <React.Fragment>
      <Router>
        <header className="App-header">
          <div className="hamburger-menu">
            <div className="header-title">
              <Content />
            </div>

            <div>
              <Logbutton />
            </div>

            <input type="checkbox" id="menu-btn-check" />
            <label htmlFor="menu-btn-check" className="menu-btn">
              <span></span>
            </label>
            {/* <!--ここからメニュー--> */}
            <div className="menu-content">
              {/* <div>{user.displayName}</div>
              <div className="userImg">
                <img src={user.photoURL} />
              </div> */}
              <ul>
                <li>
                  <Link to={`/myPage`}> Mypage </Link>
                </li>
                <li>
                  <Link to={`/map`}> Map</Link>
                </li>
                <li>
                  <Link to={`/place`}> Place </Link>
                </li>
              </ul>
            </div>
            {/* <!--ここまでメニュー--> */}
          </div>
        </header>
        {/* Switchでルーティング(アクセス経路)設定の世界 */}
        <div className="pageLink"></div>


        <Switch>
          {/* 　//URLのパスが'/myPage'のみの時にMyPageを表示する */}
          <Route path="/myPage" exact component={MyPage} />
          <Route path="/map" exact component={Map} />
          <Route path="/place" exact component={Place} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
