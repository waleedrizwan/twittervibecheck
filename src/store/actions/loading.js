export const SET_LOADING = "SET_LOADING";
export const SET_NO_TWEETS_FOUND = "SET_NO_TWEETS_FOUND";

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};


export const setNoTweetsFound = (noTweetsFound) => {
    return {
      type: SET_NO_TWEETS_FOUND,
      noTweetsFound: noTweetsFound
    };
  };