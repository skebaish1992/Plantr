import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'

class Friend extends Component {


  addFriend(currentUserId, attributes) {
  axios.put('/api/users/friends/' + currentUserId,
    {
      id: currentUserId,
      friendAttributes: attributes
    }
  ).then((res) => {
  }).catch((err) => {
    console.error("Post has not updated on EditPost: ", err);
  });
  }


  render() {
    let context = this;
    return (
        <div>
          <div className="col-md-8">
            <div className="row">
              <div className="profiles">
                <p className="name">{this.props.email}</p>
                <img src={this.props.profilePhoto}/>
                <br />
                <br />
                <br />
                <br />
                <div className="row profile-description">
                  <p className="about-me-description">
                  {this.props.about}
                  </p>
                  <br></br><br></br>

                  <div>
                  <button className="d-block bg-success" onClick={() =>{
                    let currentUserId = this.props.currentUser;
                    let friendProperties = {
                      'currentUserId': currentUserId,
                      'profilePhoto': this.props.profilePhoto,
                      'email': this.props.email
                    }

                    context.addFriend(currentUserId, friendProperties);
                    alert("You added " + this.props.email + " as a friend!")
                  }
                  }>Add As Friend</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.userProfileReducer.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchPlantHardiness(hardiness) {
      dispatch(setPlantHardiness(hardiness));
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Friend;