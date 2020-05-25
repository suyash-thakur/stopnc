const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Blog  = require("../Model/Posts");
const checkAuth = require("../middleware/check-auth");

const Comment = require("../Model/Comment");
const router = express.Router();

const app = express();

router.get("/blogs:id", (req, res, next) => {
  Blog.findById(req.params.id).populate('authorId').then( blog => {
    if(blog) {
      Comment.find({'blog': req.params.id}).populate('author').exec(function(err, comment) {
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(201).json({
            Blog: blog, Comment: comment
          });
        }
      });
    }
  });
});
router.get("/comment:id", (req, res, next) => {
  Comment.find({'blog': req.params.id}).populate('author').exec(function(err, comment) {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({
        comment
      });
    }
  });
})
router.get("/allBlog", (req, res, next) => {
  Blog.find().populate('authorId').then ( blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json("Blog not found");
    }
  });
});

router.post("/createBlog", checkAuth, async function (req, res)  {
  const blog = new Blog ({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    body: req.body.body,
    authorId: req.body.authorId
  });
  blog.save().then( result => {
    res.status(201).json({
      message: "Blog Created",
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


router.post("/comment:id", (req, res, next) => {
  const comment = new Comment({
    body: req.body.body,
    author: req.body.postedBy,
    blog: req.params.id
  });
  comment.save().then( result => {
    res.status(201).json({
      message: "comment Created",
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
