const TweetsSelector = {
  tweetIds: state =>
    Object.keys(state.tweets).sort(
      (tweet1, tweet2) => tweet2.timestamp - tweet1.timestamp
    )
};

export default TweetsSelector;
