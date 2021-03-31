import { GET_TWEETS } from "../actions/tweets";

const initialState = {
  tweetsArray: [],
  sentimentArray: [],
  noTweetsFound: false, // true when no tweets are found
};

async function getTwitterUser(username, selection, endpoint = "user") {
  try {
    var res = await fetch(
      `https://tweet--scope.herokuapp.com/${endpoint}?username=${username}&selection=${selection}`,

      {
        // this will be your heroku domain
        method: "POST",
        mode: "no-cors",

        cache: "no-cache",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
    // user tweets are stored in body
    var body = await res.json();
    console.log("getTwitterUser Run");
    return body;
  } catch (err) {
    console.log("Issue with line 20 index.js", err);
  }
}

// formats any large number with comma's and appropriate spacing
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// need to keep track of total tweets scope to date
async function getTweetData(searchCriteria) {
  console.log("searchCriteria", searchCriteria);
  // search criteria is an object {type:'username', searchValue: 'elonmusk'}

  let dataChoice = searchCriteria.type;
  let searchValue = searchCriteria.searchValue;
  let tweetArray;
  //   let tweetArray = await getTwitterUser(searchValue, "username");

  // if user selects filter by username retrieve last 200 tweets of the given username or none if not found
  if (dataChoice == "username") {
    // holds 200 most recent tweets from user 'x'
     console.log('CONDITIONAL TRIGGERED')

    tweetArray = await getTwitterUser(searchValue, "username");

    if (tweetArray.length > 0) {
      // array of compound scores
      var sentimentScores = tweetArray.map(
        (elm) => elm["sentiment"]["compound"]
      );
      var total = 0;
      for (var i = 0; i < sentimentScores.length; i++) {
        total += sentimentScores[i];
      }

      var avgScore = (total / sentimentScores.length).toFixed(3);

      var overallScore = "Neutral";

      if (avgScore >= 0.05) {
        overallScore = "Positive";
      } else if (avgScore <= -0.05) {
        overallScore = "Negative";
      }

      console.log("Average Sentiment Score ", avgScore);
      console.log(tweetArray);
    }
  } // Ends Conditional Block

  let returnObject = {
    tweets: tweetArray,
    sentimentScores: avgScore,
  };

  return returnObject;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TWEETS:
      const searchCriteria = action.searchCriteria;

      async function getRawData() {
        let rawData = await getTweetData(searchCriteria);
        return rawData;
      }
      // searchCriteria {type: , searchValue:}
      let data = getRawData();
      // {tweets: , sentimentScores: }

      let updatedTweetsArray = data["tweets"];
      let updatedSentimentScore = data["sentimentScores"];

      console.log(updatedTweetsArray);
      return {
        tweetsArray: updatedTweetsArray,
        sentimentArray: updatedSentimentScore,
        noTweetsFound: updatedTweetsArray.length >0 ? false : true // if length of tweets is > 0
      };
  }

  return state;
};
