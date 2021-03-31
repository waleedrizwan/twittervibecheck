import { INIT_TOTAL, UPDATE_TWEETS, UPDATE_TOTAL } from "../actions/tweets";

const initialState = {
  tweetsArray: [],
  sentimentArray: {},
  noTweetsFound: false, // true when no tweets are found
  tweetsToDate: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TWEETS:
      let updatedTweetsArray = action.tweetData;
      let tweetSize = action.tweetData.length;

      if (updatedTweetsArray.length > 0) {
        // array of compound scores
        var sentimentScores = updatedTweetsArray.map(
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
      }

      let updatedSentimentScore = {
        overallScore: overallScore,
        avgScore: avgScore,
      };

      return {
        tweetsArray: updatedTweetsArray,
        sentimentArray: updatedSentimentScore,
        noTweetsFound: updatedTweetsArray.length > 0 ? false : true, // if length of tweets is > 0
        tweetsToDate: state.tweetsToDate + tweetSize,
      };
    case INIT_TOTAL:
      let firebaseTotal = action.totalTweets; // pulled from  firebase on initial load

      return {
        tweetsArray: state.tweetsArray,
        sentimentArray: state.sentimentArray,
        noTweetsFound: state.noTweetsFound,
        tweetsToDate: firebaseTotal,
      };
    
    case UPDATE_TOTAL:
      let toAdd = action.newTotal
      
      return {
        tweetsArray: state.tweetsArray,
        sentimentArray: state.sentimentArray,
        noTweetsFound: state.noTweetsFound,
        tweetsToDate: toAdd
      }
  }

  return state;
};
