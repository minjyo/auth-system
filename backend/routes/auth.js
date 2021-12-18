const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// /auth/sign
router.post("/sign", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.json({ message: "이미 존재하는 사용자" });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            password: hash,
        });
        return res.json({ message: "Sign OK" });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/login
router.post("/login", async (req, res, next) => {
    try {
        passport.authenticate("local", (passportError, user, info) => {
            if (passportError || !user) {
                res.status(400).json({ message: info.reason });
                return;
            }
            req.login(user, { session: false }, (loginError) => {
                if (loginError) {
                    res.send(loginError);
                    return;
                }
                const token = jwt.sign({ id: user.id, email: user.email, role: user.role, intro: user.intro }, process.env.JWT_SECRET, {
                    expiresIn: "30m",
                });
                console.log("token", token);
                res.status(200).json({ message: "Login OK", result: token });
            });
        })(req, res);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
