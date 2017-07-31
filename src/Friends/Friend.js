import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'

class Friend extends Component {


  render() {

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