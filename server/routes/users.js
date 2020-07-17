const express = require('express');
const router = express.Router();

const db = require('./../queries/queries-users');


router.post('/register', db.registerUser);
router.post('/login', db.loginUser);

module.exports = router;
