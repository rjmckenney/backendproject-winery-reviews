var express = require('express');
var router = express.Router();
const reviewModel = require("../models/reviewModel")
const wineryModel = require("../models/wineryModel")

router.get("/", async function (req, res, next) {
    const reviewData = await reviewModel.getAllReviews();
  
    res.render("template", {
          locals: {
              title: "Reviews",
              data: reviewData,
              user_id: req.session.user
          },
          partials: {
              partial: "partial-review"
          }
          }
      )
})

router.get("/newreview/:winery_id", async function (req, res, next) {
    const { winery_id } = req.params;
    const winery = await wineryModel.getById(winery_id);
    res.render("template", {
          locals: {
              title: `Add Review for ${winery.name}`,
              isLoggedIn: req.session.is_logged_in,
              user_id: req.session.user,
              wineryData: winery,
            
          },
          partials: {
              partial: "partial-reviewentry"
          }
          }
      )
})

router.post("/addreview/:winery_id", async (req, res) => {
    const { winery_id } = req.params;
    console.log("add function winery id: ", winery_id)
    const{ review_score, review_content } = req.body;
    const user_id = req.session.user;
    console.log("user id:", user_id)
    const new_review = new reviewModel(review_score, review_content, winery_id, user_id)
    console.log("new review object", new_review)
    const addReview = await new_review.addNewReview();
    console.log("review route");
    if (addReview){
        res.status(200).redirect("/");
    }
    else {
        res.sendStatus(500);
    }
})

module.exports = router;