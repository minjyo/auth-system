const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// /user/info
router.get("/info", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
        const exUser = await User.findOne({ where: { id: decoded.id } });

        res.status(200).json({ message: "Get User Info OK", result: exUser });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// /user/intro
router.post("/intro", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

        await User.update(
            {
                intro: req.body.intro,
            },
            {
                where: {
                    id: decoded.id,
                },
            }
        );

        res.json({ message: "Post User Intro OK" });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
