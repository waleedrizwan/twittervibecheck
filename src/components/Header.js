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
import PulseLoader from "react-spinners/PulseLoader";


const Header = (props) => {
  const dispatch = useDispatch();
  const tweetsData = useSelector((state) => state.tweets.tweetsArray);
  const [isLoading, setIsLoading] = useState(false);

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
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        // console.log(trendingList);
      })
      .catch((err) => {
        setTrendingList([]);
        setIsLoading(false);
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
          // create new data using a post request
          method: "GET",
        }
      );

      const resData = await response.json();
      let currentTotal;

      for (const key in resData) {
        currentTotal = parseFloat(resData[key].tweetsToDate);
      }
      
      // if currentTotal is undefined return 0 else return the defined number
      currentTotal = !currentTotal ? 0 : currentTotal

      dispatch(tweetActions.initTotal(currentTotal));
    };

    inittotalTweets();
  }, []);

  let formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  const MyComponent = React.forwardRef((props, ref) => {
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={ref} style={{ fontSize: "20px" }}>
        Tweets analyzed to date{" "}
        <Badge variant="primary"> {formatNumber(totalTweetsToDate)}</Badge>
      </div>
    );
  });

  //  let MyComponent;
  //  const MyComponent = (totalTweetsToDate <= 0 || !totalTweetsToDate) ? <div></div> : MyToolTip
  
  let today = new Date();
  const color = "#4A90E2";
  console.log("total tweets to date state variable", totalTweetsToDate)

  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <h1 className="text-center text-primary">Search 🔎</h1>
        <h6>
        {/* <MyComponent />    */}
        {(totalTweetsToDate <= 0 || !totalTweetsToDate) ? <div></div> : <div> <Tooltip title={`As of ${today}`}><MyComponent /></Tooltip> <br/><br/><br/> </div> }   
        </h6>

        {/* <br />
        <br />
        <br />  */}
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
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PulseLoader color={color} loading={true} size={10} margin={2} />
          </div>
        ) : trendingList.length === 0 ? (
          <p>No Trending Topics Were Found</p>
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr></tr>
            </thead>
            <tbody>{handleTrendingTopics()}</tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Header;
