const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const router = express.Router();

// /admin/users
router.get("/users", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

        if (decoded.role) {
            const users = await User.findAll({
                where: {
                    id: {
                        [Op.ne]: decoded.id,
                    },
                    state: 0,
                },
            });
            res.status(200).json({ message: "Get Users OK", result: users });
        } else {
            res.status(403).json({ message: "Not Admin" });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// /admin/user
router.post("/user", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

        if (decoded.role) {
            const users = await User.update(
                { state: 1 },
                {
                    where: {
                        email: req.body.email,
                    },
                }
            );
            res.status(200).json({ message: "Delete User OK", result: users });
        } else {
            res.status(403).json({ message: "Not Admin" });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// /admin/setAdmin
router.post("/setAdmin", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

        if (decoded.role) {
            const users = await User.update(
                { role: 1 },
                {
                    where: {
                        email: req.body.email,
                    },
                }
            );
            res.status(200).json({ message: "Set Admin OK", result: users });
        } else {
            res.status(403).json({ message: "Not Admin" });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
