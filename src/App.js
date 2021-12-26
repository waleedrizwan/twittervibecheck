import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TweetTable from "./components/TweetTable";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider} from "react-redux";
import tweetsReducer from "./store/reducers/tweets";
import loadingReducer from "./store/reducers/loading";
import React, { useState } from "react";
import About from "./components/About";
import ReduxThunk from "redux-thunk";
import CenteredModal from "./components/CenteredModal";
import ReactTooltip from "react-tooltip";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  loading: loadingReducer,
});

// merge all stores
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App =  () => {
  const [modalShow, setModalShow] = useState(true);
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
      <br/>
      <br/>
      <br/>
      <br/>
      <SearchBar />
      <TweetTable />
    </div>
  );
};

const AboutPage = () => {
  return <About />;
};

export default App;
