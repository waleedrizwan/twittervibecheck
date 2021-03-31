import React, { useEffect, useState } from "react";
// import "./Style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Table.css";
import { useSelector, useDispatch } from "react-redux";
import * as tweetActions from "../store/actions/tweets";
import * as loadingActions from "../store/actions/loading";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("Username");
  const [tweetSummary, setTweetSummary] = useState();
  const [sentimentSummary, setSentimentSummary] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let summary;

  const dispatch = useDispatch();

  const handleApiCall = () => {
    if (!type || !searchValue) {

      handleShow();

      return;

    }

    setTweetSummary("");
    setSentimentSummary("");
    dispatch(tweetActions.updateTweets([]));
    dispatch(loadingActions.setLoading(true));
    dispatch(loadingActions.setNoTweetsFound(false));
    
    let tweetsArray;

    let username = searchValue;
    let selection = type;

    if (selection === "Username" || selection === "Hashtag") {
      selection = type.toLowerCase();
    }

    fetch(
      `https://tweetscopeapitest.herokuapp.com/user?username=${username}&selection=${selection}`,

      {
        method: "POST",
        mode: "cors",

        cache: "no-cache",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        
        tweetsArray = data;

        dispatch(tweetActions.updateTweets(tweetsArray));
        dispatch(loadingActions.setLoading(false));
        dispatch(tweetActions.updateTotal(tweetsArray.length));

        if (selection === "username") {
          summary = `${tweetsArray.length} tweets made by user @${searchValue}`;
          setTweetSummary(summary);
        } else if (selection === "hashtag") {
          summary = `${tweetsArray.length} tweets about #${searchValue}`;
          setTweetSummary(summary);
        } else if (type === "Liked Tweets By Username") {
          summary = `${tweetsArray.length} tweets liked by user @${searchValue}`;
          setTweetSummary(summary);
        }

        if (tweetsArray.length <= 0) {
          dispatch(tweetActions.updateTweets([]));
          dispatch(loadingActions.setNoTweetsFound(true));
          dispatch(tweetActions.updateTotal(tweetsArray.length));
          summary = `no tweets found for ${searchValue}`;

          if (selection === "username") {
            summary = `No tweets made by user @${searchValue}`;
            setTweetSummary(summary);
          } else if (selection === "hashtag") {
            summary = `No tweets about #${searchValue}`;
            setTweetSummary(summary);
          } else if (type === "Liked Tweets By Username") {
            summary = `No tweets liked by user @${searchValue}`;
            setTweetSummary(summary);
          }

          setTweetSummary(summary);
          let sentimentMessage = "";
          setSentimentSummary(sentimentMessage);
        } else {
          var sentimentScores = tweetsArray.map(
            (elm) => elm["sentiment"]["compound"]
          );
          var total = 0;
          for (var i = 0; i < sentimentScores.length; i++) {
            total += sentimentScores[i];
          }

          var avgScore = (total / sentimentScores.length).toFixed(3);

          var overallScore = "Neutral 😐";

          if (avgScore >= 0.05) {
            overallScore = "Positive 😃";
          } else if (avgScore <= -0.05) {
            overallScore = "Negative 😠";
          }

          let sentimentMessage = `With an overall ${overallScore} sentiment, with an average compound score of ${avgScore}`;
          setSentimentSummary(sentimentMessage);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(tweetActions.updateTweets([]));
        dispatch(loadingActions.setNoTweetsFound(true));
        summary = `no tweets found for ${searchValue}`;
        setTweetSummary(summary);
        let sentimentMessage = "";
        setSentimentSummary(sentimentMessage);
      });
  };

  let filterType;

  if (type === "Username") {
    filterType = "finding tweets by @Username";
  } else if (type === "Hashtag") {
    filterType = "finding tweets by #Hashtag";
  } else {
    filterType = "finding tweets liked by @Username";
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleApiCall();
    }
  };

  return (
    <div>
      <strong>
        <h3 id="filterType" className="text-center">
          {!type ? "Please Select A Filter First" : filterType}
        </h3>
      </strong>
      <div className="float-container">
        <div className="float-child">
          <select
            id="selectTag"
            className="form-control form-control-sm"
            onChange={(e) => setType(e.target.value)}
          >
            <option defaultValue="Username" disabled>
              Filter Tweets By
            </option>
            <option>Username</option>
            <option>Hashtag</option>
            <option>Liked Tweets By Username</option>
          </select>
        </div>
        <div className="float-child text-primary">
          <div className="form-group text-primary">
            <input
              id="userinput"
              placeholder={`Enter Username or Hashtag ex "jeffbezos" "tesla" `}
              maxLength="20"
              size="60"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="submitButton float-child">
          <Button
            className="submitButton"
            onClick={() => {
              handleApiCall();
            }}
          >
            <h6 style={{color:'white'}} >
            Pull Tweets
            </h6>
          </Button>
        </div>

        <br />
      </div>
      <strong>
        <h2 className="text-center text-primary">{tweetSummary}</h2>
      </strong>
      <strong>
        <h2 className="text-center text-primary">{sentimentSummary} </h2>
      </strong>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please enter a value before searching!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SearchBar;
