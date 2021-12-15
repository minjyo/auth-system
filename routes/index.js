const express = require("express");
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.get("/", isLoggedIn, (req, res) => {
    res.send("메인 페이지");
});

router.get("/sign", isNotLoggedIn, (req, res) => {
    res.send("회원가입 페이지");
});

module.exports = router;
