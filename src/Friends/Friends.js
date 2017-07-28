import React, { Component } from 'react';

import ReactDOM from 'react-dom'

class Friends extends Component {

  getAllUsers() {
    axios.get('/api/users/');
  }


  render() {

    return (
        <div>
          <div className="col-md-6 col-md-offset-3">
              <h2 className="text-center">Friends</h2>
          </div>
          <div className="col-md-8">
            <div className="row">
              <a target="_blank" href="https://www.linkedin.com/in/ariel-salem-43199412a">
              <div className="profiles">
                <p className="name">Ariel Salem</p>
                <img src="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAh_AAAAJGY5YTM4MzJkLTcxNWMtNDU2Yy04NjNlLTZkODFkMzZkNzYwZA.jpg" />
                <br />
                <br />
                <br />
                <br />
                <div className="row profile-description">
                  <p className="about-me-description">Ariel is a full-stack engineer with a strong background in JavaScript (ES6) that is passionate about design, development and building innovative products and systems that empower individuals and companies to succeed. He loves working autonomously and in groups to take on challenges and solve problems that require cutting-edge technology and creativity.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <a target="_blank" href="https://www.linkedin.com/in/ryanaperry/">
            <div className="profiles">
              <p className="name">Ryan Perry</p>
              <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/05c/3b3/0de3dc3.jpg" />
               <br />
               <br />
               <br />
               <br />
               <div className="row profile-description">
                 <p className="about-me-description">Ryan Perry is a full-stack software engineer from Indiana currently living in San Francisco. Ryan enjoys exploring new topics, products, and technologies to learn and has an interest in trying to understand the philosophy behind what makes companies run the way they do. He prides himself on his ability to draw on his past experiences and connections to add value to whatever team with which he's working.
                 </p>
               </div>
             </div>
            </a>
          </div>
        </div>
        </div>
    )
  }
}
export default Friends;

