const express = require("express");
const User  = require("../Model/user");
const Notification = require("../Model/Notification");
const Blog  = require("../Model/Posts");
const checkAuth = require("../middleware/check-auth");
const uploadBlogPicture = require("../middleware/uploadblog");
const Comment = require("../Model/Comment");
const Product = require("../Model/Product");
const HomePage = require("../Model/HomePage");
const uploadProductImage = require("../middleware/uploadProduct");
const Explore = require('../Model/Explore');
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
    FirstBlog: req.body.blog1,
    SecondBlog: req.body.blog2,
    TopStories: req.body.topStories
  });
  blog.save(function (err, blog) {
    if (err) {
      res.status(501).json(err);
    } else {
      res.status(201).json({ blog: blog });
    }
  });
});

router.post('/createProduct', (req, res) => {
  const product = new Product({
    name: req.body.name,
    link: req.body.link,
    description: req.body.description,
    image: req.body.image
  });
  product.save(function (err, prod) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({ product: prod });
    }
  })
});

router.get('/homepageInfo', async (req, res) => {
  let homepage = (await HomePage.find({}).populate('FirstBlog').populate('SecondBlog').populate('TopStories').sort({ _id: -1 }).limit(1))[0];
  res.status(201).json({ home: homepage });
});
router.get("/allBlog", (req, res, next) => {
  Blog.find().populate('authorId', 'name').then ( blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json("Blog not found");
    }
  });
});
router.get("/unverifiedBlog", (req, res, next) => {
  Blog.find({isVerified: false}).populate('authorId', 'name').then ( blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json("Blog not found");
    }
  });
});

router.get('/productInfo', (req, res) => {
  Product.find().then(blog => {
    if (blog) {
      res.status(201).json({blog: blog});
    } else {
      res.status(501).json({error: "cannot fetch blog"})
    }
  })
});

router.put('/verify:id', (req, res) => {
  Blog.findOneAndUpdate({ _id: req.params.id }, { isVerified: true, products: req.body.product }).then(blog => {
    if (blog) {
      res.status(201).json({ blog: blog });
    } else {
      res.status(501).json({ error: "Error Creating Blog" });
    }
  });
});
router.post('/deleteProduct:id', (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }).then(product => {
    res.status(200).json({ message: 'Product Deleted', product: product });
  });
});

router.post('/uploadProductImage', uploadProductImage.array('image', 7),  async (req, res) => {
  res.status(200).json({ image: 'https://stopnc.s3.ap-south-1.amazonaws.com/profilepicture/'  + req.file});
});

router.post('/createExplore', (req, res) => {
  const ExplorePage = new Explore({
    product: req.body.product,
    trending: req.body.trending,
    exclusive: req.body.exclusive
  });
  ExplorePage.save(function (err, explore) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(201).json({ explore: explore });
    }
  })
});

router.get('/explore', async (req, res) => {
  Explore.find().populate('product').populate('trending').populate('exclusive').then(explore => {
    res.status(201).json({ explore: explore[0] });

  });
});



module.exports = router;