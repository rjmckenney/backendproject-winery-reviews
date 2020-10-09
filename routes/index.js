var express = require('express');
var router = express.Router();
const wineryModel = require("../models/wineryModel")

router.get("/", async function (req, res, next) {
    const wineryData = await wineryModel.getAll();
  
    res.render("template", {
          locals: {
              title: "Wine Reviews",
              data: wineryData,
              isLoggedIn: req.session.is_logged_in,
              user_id: req.session.user
          },
          partials: {
              partial: "partial-index"
          }
          }
      )
})


router.get("/new_winery", async function (req, res, next) {

    res.render("template", {
          locals: {
              title: "Add Winery",
              isLoggedIn: req.session.is_logged_in,
              user_id: req.session.user
            
          },
          partials: {
              partial: "partial-addwinery"
          }
          }
      )
})

module.exports = router;
