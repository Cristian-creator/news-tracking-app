const express = require('express');
const router = express.Router();

const db = require('./../queries/queries-news');

// router.post('/register', db.registerUser);
// router.post('/login', db.loginUser);

router.post('/get-news', db.getNews);
router.post('/get-sources', db.getSources);

router.patch('/add-subscription', db.addSubscription);
router.patch('/remove-subscription', db.removeSubscription);


module.exports = router;