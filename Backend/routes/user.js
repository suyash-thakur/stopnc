const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Notification = require("../Model/Notification");
const Comment = require("../Model/Comment");
const Blog  = require("../Model/Posts");

const User  = require("../Model/user");
const checkAuth = require("../middleware/check-auth");
const { populate } = require("../Model/user");


const router = express.Router();

router.put("/bookmark:id", checkAuth, (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, {$push: {bookmarked: req.body.postId}}).then(result => {
    if(result){
      res.status(200).json({message: "Bookmarked"});
    } else {
      res.status(500).json({message: "Error Bookmarked"});
    }
  });

});
router.put("/removebookmark:id", checkAuth, (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, {$pull: {bookmarked: req.body.postId}}).then(result => {
    if(result){
      res.status(200).json({message: "Bookmark Removed"});
    } else {
      res.status(500).json({message: "Error Removing"});
    }
  });

});

router.post("/signup", (req, res, next) => {

 bcrypt.hash(req.body.password, 10).then(hash => {
   const user = new User({
     name: req.body.name,
     email: req.body.email,
     password: hash,
     discription: '',
     about: ''
   });
   user
     .save()
     .then(result => {
       res.status(201).json({
         message: "User created!",
         result: result
       });
     })
     .catch(err => {
       res.status(500).json({
         error: err
       });
     });
 });
});


router.post("/login",(req, res, next) => {
   let fetchedUser;
   User.findOne({ email: req.body.email })
    .then(user => {
         if (!user) {
           return res.status(401).json({
               message: "Auth failed"
           });
         }
       fetchedUser = user;
       return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
          return res.status(401).json({
              message: "Auth failed"
          });
      }
    const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
       'letmein@26', {expiresIn: '365d'}
     );
     res.status(200).json({
         token: token

     });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Auth failed"
        });
    });
});
router.get("/userInfo:id",checkAuth, (req, res, next) => {
 User.findById(req.params.id).populate('follower').populate('following').populate({path: 'bookmarked', model: 'Post', populate: { path: 'authorId', model: 'user'}}).then(async function(user) {
   if (user) {
     const notification = await Notification.find({recipient: req.params.id}).populate("refId").exec();
     res.status(200).json({User: user, Notification: notification});
   } else {
     res.status(404).json({ message: "Post not found!" });
   }
 });
});
router.put("/userUpdate:id",checkAuth, (req, res, next) => {
 const user = new User({
   _id: req.body.id,
   name: req.body.name,
   discription: req.body.cridential,
   about: req.body.about
 });
 User.updateOne({_id: req.params.id}, user).then(result => {
   res.status(200).json({ message: "Update successful!" });
 });
});

router.put("/follow:id", checkAuth, (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, {$push: {follower: req.body.followerId}}).then(result => {
    User.findOneAndUpdate({_id: req.body.followerId}, {$push: {following: req.params.id}}).then(result => {
      if(result){
        res.status(200).json({message: "Followed Successfully"});
      } else {
        res.status(500).json({message: "Error Following This Person"})
      }
    })
  })
})

router.put("/unfollow:id", checkAuth, (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, {$pull: {follower: req.body.followerId}}).then(result => {
    User.findOneAndUpdate({_id: req.body.followerId}, {$pull: {following: req.params.id}}).then(result => {
      if(result){
        res.status(200).json({message: "Followed Successfully"});
      } else {
        res.status(500).json({message: "Error Following This Person"})
      }
    })
  })
})
router.post("/notficationSeen:id", (req, res, next)=> {
  Notification.updateMany({recipient: req.params.id, isRead: false}, {isRead: true}, function(result, err) {
    res.status(201).json('Notification Updated');
  });
});
router.get("/commentUser:id", (req, res, next) => {
  console.log("User");

  Comment.find({'author': req.params.id }).populate('blog', 'title').exec(function(err, comment) {
    if(err) {
      res.status(500).json(err);
    } else {
      console.log(comment);
      res.status(201).json({
        comment
      });
    }
  });
});


router.put("/unlike:id", (req, res, next) => {
  Blog.findOneAndUpdate({_id: req.params.id},{$pull: {like: req.body.userId}}).then(responce => {
    if (res){
      res.status(201).json({
        message: "UnLiked",
        result: responce
      });
    } else {
      res.status(500).json({
        message: "Error"
      });
    }

  });
});
router.get("/getBookmark:id", checkAuth, (req, res, next) => {
  User.findOne({_id: req.params.id}, "bookmarked").then (result => {
    if (result) {
      res.status(200).json({bookmark: result});

    }else {
      res.status(500).json({message: "Error Getting Bookmark"});
    }
  });

});
module.exports = router;
