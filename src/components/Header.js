import React, { useEffect, useState } from "react";
// import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import * as tweetActions from "../store/actions/tweets";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./Header.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const tweetsData = useSelector((state) => state.tweets.tweetsArray);

  const totalTweetsToDate = useSelector((state) => state.tweets.tweetsToDate);
  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));

  const woeids = {
    Canada: "23424775",
    "U.K": "23424975",
    "U.S": "2352824",
    Mexico: "23424768",
    Brazil: "23424768",
    Ireland: "23424975",
  };

  const [trendingTopicId, setTrendingTopicId] = useState(woeids["Canada"]);
  const [trendingList, setTrendingList] = useState();

  useEffect(() => {
    fetch(
      `https://tweetscopeapitest.herokuapp.com/user?locationId=${trendingTopicId}&selection=trendingTopics`,

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
        setTrendingList(data);
        // console.log(trendingList);
      });
  }, [trendingTopicId]);

  const handleTrendingTopics = () => {
    if (trendingList) {
      return trendingList.map((elm, index) => (
        <tr className="sticky-column" key={index}>
          <td>{elm["name"]}</td>
        </tr>
      ));
    } else {
      return null;
    }
  };

  useEffect(() => {
    const inittotalTweets = async () => {
      const response = await fetch(
        `https://twitterscopedb-default-rtdb.firebaseio.com/total.json`,

        {
          // create new data using a post request_
          method: "GET",
        }
      );

      const resData = await response.json();

      let currentTotal;

      for (const key in resData) {
        currentTotal = parseFloat(resData[key].tweetsToDate);
      }

      dispatch(tweetActions.initTotal(currentTotal));
    };

    inittotalTweets();
  }, []);

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const MyComponent = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={ref} style={{ fontSize: "20px" }}>
        Tweets analyzed to date{" "}
        <Badge variant="primary"> {formatNumber(totalTweetsToDate)}</Badge>
      </div>
    );
  });

  let today = new Date();
  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <h1 className="text-center text-primary">API Wrapper</h1>
        <h6>
          <Tooltip title={`As of ${today}`}>
            <MyComponent />
          </Tooltip>
        </h6>

        <br />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ justifyContent: "row" }} className="text-center">
           Trending Topics In
        </h3>

        <div>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control
              onChange={(e) => setTrendingTopicId(woeids[e.target.value])}
              as="select"
              defaultValue="Canada"
            >
              <option>{"Canada"}</option>
              <option>{"U.S"}</option>
              <option>{"U.K"}</option>
              <option>{"Mexico"}</option>
              <option>{"Brazil"}</option>
              <option>{"Ireland"}</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div className="container" style={{ width: "300px" }}>
        <Table
          // responsive="sm"
          striped
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>{/* <th className="sticky-column">Trending Topics</th> */}</tr>
          </thead>
          <tbody>{handleTrendingTopics()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Header;
