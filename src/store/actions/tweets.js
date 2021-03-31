export const UPDATE_TWEETS = "UPDATE_TWEETS";
export const INIT_TOTAL = "INIT_TOTAL";
export const UPDATE_TOTAL = "UPDATE_TOTAL";

export const updateTweets = (tweetData) => {
  return {
    type: UPDATE_TWEETS,
    tweetData: tweetData,
  };
};

export const initTotal = (totalTweets) => {
  return {
    type: INIT_TOTAL,
    totalTweets: totalTweets,
  };
};

// modify firebase by taking what number it currently is and adding "add" to it
export const updateTotal = (add) => {
  return async (dispatch, getState) => {
    let currentTotal;

    const response3 = await fetch(
      `https://twitterscopedb-default-rtdb.firebaseio.com/total.json`,

      {
       
        method: "GET",
      }
    );

    const resData2 = await response3.json();

    for (const key in resData2) {
      currentTotal = parseFloat(resData2[key].tweetsToDate);
    }


    // add being the size of the tweetsArray pulled when this action is called
    const newTotal = currentTotal + add;

    const response1 = await fetch(
      "https://twitterscopedb-default-rtdb.firebaseio.com/total.json",
      {
        // override data with PATCH request
        method: "DELETE",
      }
    );
    // update firebase
    const response = await fetch(
      "https://twitterscopedb-default-rtdb.firebaseio.com/total.json",

      {
        // create new data using a post request
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetsToDate: newTotal,
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: UPDATE_TOTAL,
      newTotal: newTotal,
    });
  };
};
