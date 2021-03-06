import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsListEntry from './FriendsListEntry';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayedFriends: []
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    // let newdisplayedFriends = [];
    // const search = this.refs.searchPosts.value
    // this.props.posts.forEach((post) => {
    //   let { message, nickname, title } = post;
    //   if (message.includes(search)) {
    //     newDisplayedPosts.push(message);
    //   } else if (nickname.includes(search)) {
    //     newDisplayedPosts.push(nickname);
    //   } else if (title.includes(search)) {
    //     newDisplayedPosts.push(title);
    //   }
    //   this.setState({ displayedFriends: newDisplayedPosts })
    // });
  }

  render() {
    const profile = this.props.profile;
    console.log(this.props.friends)
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1 right user-recent">
          <div className="user-recent-span"> Friends List
            <div className="search-friends">
              <input
                className="search-friends-input"
                onChange={this.onInputChange}
                ref="searchFriends"
                placeholder="search for friends"
              />
            </div>
            <hr />
            <div>
                {this.props.friends.map((post, i) => <FriendsListEntry key={i} friend={post} /> )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// this is simply for demonstration purposes, once functionality exists
// we will need to refactor mapping function to deal with actual friends
const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
  };
};

export default connect(mapStateToProps)(FriendsList);
