const express = require("express");
const User  = require("../Model/user");
const Notification = require("../Model/Notification");
const Blog  = require("../Model/Posts");
const checkAuth = require("../middleware/check-auth");
const uploadBlogPicture = require("../middleware/uploadblog");
const Comment = require("../Model/Comment");
const Product = require("../Model/Product");
const HomePage = require("../Model/HomePage");
const router = express.Router();

router.get('/countUser', async (req, res, next) => {
  User.countDocuments({}, function (err, count) {
    if (err) {
      res.status(501).json(err);
    }
    res.status(201).json(count);
  });
});

router.get('/blogCount', async (req, res, next) => {
  Blog.countDocuments({}, function (err, count) {
    if (err) {
      res.status(501).json(err);
    }
    res.status(201).json(count);
  });
});
router.get('/productCount', async (req, res, next) => {
  Product.countDocuments({}, function (err, count) {
    if (err) {
      res.status(501).json(err);
    }
    res.status(201).json(count);
  });
});

router.post('/homepageInfo', (req, res, next) => {
  const blog = new HomePage({
    blog: req.body.blog
  });
  blog.save(function (err, blog) {
    if (err) {
      res.status(501).json(err);
    } else {
      res.status(201).json({ blog: blog });
    }
  });
});

router.get('/homepageInfo', async (req, res) => {
  let homepage = (await HomePage.find({}).populate('blog').sort({ _id: -1 }).limit(1))[0];
  res.status(201).json({ home: homepage });
});

module.exports = router;
