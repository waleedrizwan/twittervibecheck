import React, { useState, useStyles } from "react";
import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const TweetTable = (props) => {
  const tweetsData = useSelector((state) => state.tweets.tweetsArray);
  const isLoading = useSelector((state) => state.loading.loading);
  const noTweetsFound = useSelector((state) => state.loading.noTweetsFound);

  // formats any large number with comma's and appropriate spacing
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const renderTableData = () => {
    return tweetsData.map((item, index) => {
      const {
        date,
        favorites,
        id,
        retweets,
        sentiment,
        tweet,
        username,
        verified,
      } = item;

      let sentimentEmoji = "😐";

      if (sentiment.compound >= 0.05) {
        sentimentEmoji = "😃";
      } else if (sentiment.compound <= -0.05) {
        sentimentEmoji = "😠";
      }

      return (
        <tr key={id}>
          <td>{date}</td>
          <td
            title={
              verified ? "Verified User" : "Unverified User"
            }
          >
            <a href={`https://twitter.com/${username}`} target="_blank">
              <div>@{username + (verified ? "☑️" : "")}</div>
            </a>
          </td>
          <td>
            <a
              href={`https://twitter.com/twitter/statuses/${id}`}
              target="_blank"
            >
              {tweet}
            </a>
          </td>
          <td>{formatNumber(favorites)}</td>
          <td>{formatNumber(retweets)}</td>
          <td>{sentiment.compound + sentimentEmoji}</td>
        </tr>
      );
    });
  };

  const color = "#4A90E2";

  return (
    <div>
      {tweetsData.length >= 1 ? (
        <table id="students">
          <thead>
            <tr>
              <th>Date</th>
              <th>Username</th>
              <th>Tweet Text</th>
              <th>Favorites</th>
              <th>Retweets</th>
              <th>Compound Sentiment Score</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      ) : null}

      <div className="text-center">
        {isLoading ? (
          <ClipLoader color={color} loading={true} size={180} />
        ) : null}
        <div>
          {noTweetsFound ? (
            <h3 id="filterType" className="text-center">
              No results found, try changing your search value
            </h3>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default TweetTable;
