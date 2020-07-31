import React, { createContext, useReducer, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Login from "./components/Login";
import "./App.css";
import CreatePost from "./components/CreatePost";
import { reducer, initialState } from "./Reducer/reducer";

export const userContext = createContext();

const Routes = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else history.push("/Login");
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Profile">
        <Profile />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/CreatePost">
        <CreatePost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
