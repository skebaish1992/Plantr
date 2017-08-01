const express = require('express');
const router = express.Router();
const Garden = require('../db/models/garden-model')

/*--------------------GET REQUEST---------------------------------------------*/

router.get('/', function(req, res, next) {
  Garden.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the garden info: ' , err);
      res.status(404);
    } else {
      console.log('Successful get request for garden info');
      res.status(200).send(data);
    }
  })
});

router.get('/:email', function(req, res, next) {
  let userGardens = [];
  Garden.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the garden info: ' , err);
      res.status(404);
    } else {
      data.forEach((garden) => {
        if (req.params.email === garden.profileEmail) {
          userGardens.push(garden);
        }
      });
      console.log('Successful get request for user garden info');
      res.status(200).send(userGardens);
    }
  })
});



/*--------------------POST REQUEST---------------------------------------------*/

router.put('/:id', (req, res, next) => {
  console.log("HERE, and the ID IS THIS SAMY! ", req.body.id)
   Garden.findById(req.body.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error updating the posts: ', err);
      res.status(500);
    } else {
      console.log("Here is the result", result.likesAndDislikes)
      console.log("Here are the likes and dislikes", req.body.likesAndDislikes)
      var newLikes = Object.keys(req.body.likesAndDislikes['likes']);
      var newDislikes = Object.keys(req.body.likesAndDislikes['dislikes']);
      var newLikesObj = {}
      var newDislikesObj = {}

      for (var i = 0; i<newLikes.length; i++){
        var fixedLikesName = newLikes[i].split('.').join('');
        newLikesObj[fixedLikesName] = 1;
        console.log("Here are the new Likes", newLikesObj)
      }

      for (var i = 0; i<newDislikes.length; i++){
        var fixedDislikesName = newDislikes[i].split('.').join('');
        newDislikesObj[fixedDislikesName] = 1;
        console.log("Here are the new Dislikeikes", newDislikesObj)
      }

      req.body.likesAndDislikes['likes'] = newLikesObj;
      req.body.likesAndDislikes['dislikes'] = newDislikesObj;
      console.log("FIXED REQ BODY", req.body.likesAndDislikes)

      result.likesAndDislikes = req.body.likesAndDislikes;
      result.save((err) => {
        if (err) {
          console.error('There has been a serverside error saving the updated posts: ', err);
          res.status(500);
        } else {
          console.log('Successfully updated a post on the server');
          res.status(200).send(result);
        }
      });
    }
  });
  });


  router.post('/', (req, res, next) => {
  var garden = new Garden({
    gardenId: req.body.gardenId,
    plantId: req.body.plantId,
    gardenGrid: req.body.gardenGrid,
    plantGrid: req.body.plantGrid,
    userEmail: req.body.userEmail,
    gardenName: req.body.gardenName,
    gardenImage: req.body.gardenImage,
    profilePicture: req.body.profilePicture,
    profileEmail: req.body.profileEmail,
    profileNickname: req.body.profileNickname,
    hardinessZone: req.body.hardinessZone,
    likesAndDislikes: req.body.likesAndDislikes
  });
  garden.save({}, (err, data) => {
    if (err) {
      console.error('There was an error saving the garden info onto the server: ', err);
      res.status(500);
    } else {
      console.log('Successfully posting garden info on the server');
      res.status(200).send(data);
    }
  });

  let api_key = 'key-b90d2dcc5bdd42c5abceba45568ea1dd';
  let domain = 'sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org';
  let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  // console.log("Here is your gardenName", garden.gardenName)
  let data = {
    from: 'Plantr <postmaster@sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org>',
    to: 'skebaish1992@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!',
    html: '<html>Inline image here: <img src="https://www.sciencea-z.com/shared/images/units/plant-life.jpg"></html>'
  };
  // mailgun.messages().send(data, function (error, body) {
  //   console.log(error);
  //   if (error) {
  //     console.log("You had an error", error);
  //   } else {
  //     console.log("The body is ", body);
  //   }
  // });
});

module.exports = router;
