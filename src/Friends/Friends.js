import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setAllFriends} from '../Actions/UserActions.js'
import ReactDOM from 'react-dom'
import Friend from './Friend'

var friendsList = [];
class Friends extends Component {

  getAllUsers() {
    axios.get('/api/users/').then((res) => {
      console.log("HERE IS THE RES.DATA ", res.data)
      this.props.dispatchSetAllFriends(res.data);
    }).catch((err) => {
      console.error('error in ProfileJS: ', err)
    })
}
  componentDidMount() {
    this.getAllUsers();
  }


  render() {
    console.log("FRIENDS LIST in render", this.props.allFriends)
    return (
        <div>
           {this.props.allFriends.map((friend, i) =>
            <Friend key={i} about={friend.about} profilePhoto={friend.profilePhoto} email={friend.email}/>)
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   allFriends: state.userProfileReducer.allFriends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetAllFriends (allFriends) {
      dispatch(setAllFriends(allFriends))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Friends)
