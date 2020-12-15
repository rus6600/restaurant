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
import Mainpage from "./Components/Mainpage";
import setRole from "./utils/setRole";
import ShowRestaurant from "./Containers/restaurant/showRestaurant";

import ListRestaurants from "./Containers/restaurants";

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
                    <Route exact path={`/restaurants/:id`} component={ShowRestaurant}/>
                    <Route exact path={'/'} component={Mainpage}/>
                    <Route exact path={'/signup'} component={SignUp}/>
                    <Route exact path={'/signin'} component={Signin}/>
                    <Route path={'/dashboard'} component={Dashboard}/>
                    <Route path={'/restaurants'} component={ListRestaurants}/>
                </Switch>
            </Router>
          </Provider>
      </div>
  );
}

export default App;
