import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';

import * as Helpers from '../utils/helpers';
import TweetsSelector from '../state/selectors/tweets';
import AuthedUserSelector from '../state/selectors/authed-user';
import { TweetsApiActionCreator } from '../state/actions/tweets';

const Avatar = ({ avatar, name }) => (
  <img src={avatar} alt={'Avatar of ' + name} className="avatar" />
);

const PublicationDate = ({ timestamp }) => <div>{Helpers.formatDate(timestamp)}</div>;

const RepliesCount = ({ replies }) => <span>{replies !== 0 && replies}</span>;

const LikesCount = ({ likes }) => <span>{likes !== 0 && likes}</span>;

const ReplyingToButton = ({ parent, handleClick }) => {
  if (!parent) {
    return null;
  }

  return (
    <button className="replying-to" onClick={handleClick}>
      Replying to @{parent.author}
    </button>
  );
};

const LikeButon = ({ hasLiked, handleClick }) => (
  <button className="heart-button" onClick={handleClick}>
    {hasLiked ? (
      <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
    ) : (
      <TiHeartOutline className="tweet-icon" />
    )}
  </button>
);

const Icons = ({ id, replies, likes, hasLiked, toggleLike }) => (
  <div className="tweet-icons">
    <TiArrowBackOutline className="tweet-icon" />
    <RepliesCount replies={replies} />
    <LikeButon hasLiked={hasLiked} handleClick={event => toggleLike(event, id)} />
    <LikesCount likes={likes} />
  </div>
);

class Tweet extends Component {
  navigateToParentTweet = (event, parentTweet) => {
    event.preventDefault();
    this.props.history.push('/tweet/' + parentTweet.id);
  };

  toggleLike = (event, tweetId) => {
    event.preventDefault();
    const { authedUser, toggleTweetLike } = this.props;
    toggleTweetLike(tweetId, authedUser);
  };

  render() {
    const { tweet } = this.props;
    if (!tweet) {
      return <div>This tweet does not exist</div>;
    }

    const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet;

    return (
      <Link className="tweet" to={'/tweet/' + id}>
        <Avatar avatar={avatar} name={name} />

        <section className="tweet-info">
          <section>
            <span>{name}</span>
            <PublicationDate timestamp={timestamp} />
            <ReplyingToButton
              parent={parent}
              handleClick={event => this.navigateToParentTweet(event, parent)}
            />
            <p>{text}</p>
          </section>

          <Icons
            toggleLike={this.toggleLike}
            id={id}
            replies={replies}
            likes={likes}
            hasLiked={hasLiked}
          />
        </section>
      </Link>
    );
  }
}

const stateToProps = (state, props) => {
  return {
    tweet: TweetsSelector.tweet(state, props),
    authedUser: AuthedUserSelector.authedUser(state)
  };
};

const dispatchToProps = dispatch => ({
  toggleTweetLike: (tweetId, authedUser) => {
    dispatch(TweetsApiActionCreator.toggleTweetLike(tweetId, authedUser));
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(Tweet)
);
