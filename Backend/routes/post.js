const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Blog  = require("../Model/Posts");
const checkAuth = require("../middleware/check-auth");


const router = express.Router();

const app = express();

router.get("/blogs:id", (req, res, next) => {
  Blog.findById(req.params.id).populate('authorId').then( blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json("Blog not found");
    }
  });
});

router.get("/allBlog", (req, res, next) => {
  Blog.find().populate('authorId').then ( blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json("Blog not found");
    }
  });
});

router.post("/createBlog", checkAuth, (req, res, next) => {
  const blog = new Blog ({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    body: req.body.body,
    authorId: req.body.authorId
  });
  console.log(blog);
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
  Blog.findOneAndUpdate({_id: req.params.id},
    {$push: {"comments": {'body': req.body.comment, 'postedBy': req.body.authorId}}}, {safe: true, upsert: true}, function (err, model) {
      if(err) {
        res.status(500).json({
          error: err
        });

      }
      else {
          res.status(201).json({
            message: 'Comment Created',
            result: model
          });
      }
    }
    );
});
module.exports = router;
