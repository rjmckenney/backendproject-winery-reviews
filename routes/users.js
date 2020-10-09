const express = require('express');
const router = express.Router();
const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs');

router.get('/signup', async(req, res, next)  => {
  res.render('template', {
    locals: {
      title: 'Sign Up',
      isLoggedIn: req.session.is_logged_in,
      user_id: req.session.user
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});
router.post('/signup', async (req, res, next) => {
  const { name, email, password, city, state } = req.body;
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new userModel (name, email, hash, city, state);
  const addUser = await user.save();
  console.log("user added", addUser)

  if (addUser){
    res.status(200).redirect("/users/login");
  }
  else {
    res.status(500);
  }
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = new userModel(null, email, password);
  const response = await user.login();

  if (!!response.isValid) {
      const { id, name } = response;
      req.session.is_logged_in = true;
      // req.session.name = name;
      // req.session.state = state;
      req.session.user = id;
      console.log("req user: ", req.session.user);
      res.status(200).redirect("/");
  } else {
      res.sendStatus(401);
  }
});

router.get('/login', async(req, res, next) => {
  res.render('template', {
    locals: {
      title: "Login",
      isLoggedIn: req.session.is_logged_in,
      user_id: req.session.user
    },
    partials: {
      partial: 'partial-login'
    }
  });
});
// the post sends information to the right place, which is the database


  router.get('/logout', (req, res, next) =>{
    req.session.destroy();
    res.status(200).redirect('/')
  })



module.exports = router;
