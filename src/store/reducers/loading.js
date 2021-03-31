import { SET_LOADING, SET_NO_TWEETS_FOUND } from "../actions/loading";

const initialState = {
  loading: false,
  noTweetsFound: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
          // return opposite of current loading state
        loading: !state.loading,
        noTweetsFound: state.noTweetsFound
      };
    case SET_NO_TWEETS_FOUND:
      return {
        loading: state.loading,
        noTweetsFound: action.noTweetsFound
      } 
      
  }

  return state;
};
