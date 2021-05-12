import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TweetTable from "./components/TweetTable";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import tweetsReducer from "./store/reducers/tweets";
import loadingReducer from "./store/reducers/loading";
import React, { useState } from "react";
import About from "./components/About";
import { makeStyles } from "@material-ui/core/styles";
import ReduxThunk from "redux-thunk";
import CustomFooter from "./components/CustomFooter";
import CenteredModal from "./components/CenteredModal";
import ScrollContainer from './components/ScrollContainer';

import ReactTooltip from "react-tooltip";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  loading: loadingReducer,
});

// merge all stores
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

let total = false;

const totalHandler = () => {
  total = !total;
};

function App() {
  const [modalShow, setModalShow] = React.useState(true);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand>
              <h3>TwitterVibeCheck.com</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Navbar.Brand>
                  <Link to="/">
                    {" "}
                    <h4 style={{ color: "white" }}>Tweet Extractor</h4>{" "}
                  </Link>
                </Navbar.Brand>
                <Navbar.Brand href="#about">
                  <Link to="/about">
                    <h4 style={{ color: "white" }}>About</h4>
                  </Link>
                </Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <ReactTooltip place="right" type="dark" effect="float" />
          
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

          <CustomFooter />
          <CenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </Router>
      </Provider>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <TweetTable />
    </div>
  );
};

const AboutPage = () => {
  return <About />;
};

export default App;

