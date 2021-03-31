import React, { useEffect, useState } from "react";
import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import * as tweetActions from "../store/actions/tweets";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

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
      <div {...props} ref={ref}>
         tweets analyzed to date {formatNumber(totalTweetsToDate)}
      </div>
    );
  });

  let today = new Date()
  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <h1 className="text-center text-primary">Extractor</h1>
        <h6>
          <Tooltip title={`As of ${today}`}>
            <MyComponent />
          </Tooltip>
        </h6>
        <strong></strong>
        <div id="contener">
          <div id="inner" className="preloader">
            <img
              src="https://cdn.usbrandcolors.com/images/logos/twitter-logo.svg"
              alt="Paris"
              className="center"
              height="300"
              width="350"
            />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Header;
