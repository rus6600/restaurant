import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"
import SignUp from "./Containers/signup";
import Signin from "./Containers/signin";
import 'antd/dist/antd.css'
import configureStore from "./store";
import {Provider} from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import * as types from "./actions/types"
import jwt_decode from "jwt-decode"
import Dashboard from "./Containers/dashboard";
import showRestaurant from "./Containers/restaurant/showRestaurant";
import {Card, Col} from "antd";
import UserInterface from "./Containers/userInterface";
import Mainpage from "./Components/Mainpage";
import SimpleSlider from "./Components/slider";
import Slider from "../src/Components/slider/Slider"
import Mainpage2 from "./Components/Mainpage/mainpage2";
import setRole from "./utils/setRole";

const store = configureStore()
console.log(localStorage)


if (localStorage.token && localStorage.role) {
    setAuthToken(localStorage.token);
    setRole(localStorage.role)
    const decoded = jwt_decode(localStorage.token);
    const userRole = localStorage.role
    store.dispatch({type: types.SET_CURRENT_USER, payload: decoded, userRole});
    const currentTime = Date.now()/1000;
    if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        setAuthToken(false);
        store.dispatch({type: types.SET_CURRENT_USER, payload: {}})
        window.location.href = "/signin";
    }
}




function App() {
  return (

      <div className="App">
          <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={Mainpage}/>
                    <Route exact path={'/signup'} component={SignUp}/>
                    <Route exact path={'/signin'} component={Signin}/>
                    <Route path={'/dashboard'} component={Dashboard}/>
                    <Route path={'/user'} component={UserInterface}/>

                </Switch>
            </Router>
          </Provider>
      </div>
  );
}

export default App;
