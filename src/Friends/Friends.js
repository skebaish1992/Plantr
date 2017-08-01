import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setAllFriends} from '../Actions/UserActions.js'
import ReactDOM from 'react-dom'
import Friend from './Friend'

var friendsList = [];
class Friends extends Component {
    constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    };
  }

  getAllUsers() {
    axios.get('/api/users/').then((res) => {
      console.log("HERE IS THE RES.DATA ", res.data)
      this.props.dispatchSetAllFriends(res.data);

      for (var i = 0; i<res.data.length; i++){
        console.log(res.data[i])
        if (res.data[i].email === this.props.profile.email){
          console.log("mauahah")
          this.setState({
            currentUser: res.data[i]['_id']
          })
        }
      }
    }).catch((err) => {
      console.error('error in ProfileJS: ', err)
    })
  }

  componentDidMount() {
    this.getAllUsers();
  }


  render() {
    console.log("Do we have access to the profile here?",this.props.profile)
    console.log("FRIENDS LIST in render", this.props.allFriends)
    return (
        <div>
           {this.props.allFriends.map((friend, i) =>
            <Friend key={i} about={friend.about} profilePhoto={friend.profilePhoto} email={friend.email} id={friend._id} currentUser={this.state.currentUser}/>)
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
