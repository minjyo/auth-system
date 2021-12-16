const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

// /v1/token
router.post("/token", async (req, res) => {
    // 여기 clientSecret 이던데... 이렇게 해도 되나?????????
    const { userInfo } = req.body;
    try {
        const user = await User.findOne({
            where: { email: userInfo.email },
        });

        if (!user) {
            return res.status(401).json({
                code: 401,
            });
        }
        const token = jwt.sign(
            {
                email: user.email,
                intro: user.intro,
                role: user.role,
                state: user.state,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m",
            }
        );
        return res.json({
            code: 200,
            message: "토큰이 발급되었습니다.",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "서버 에러",
        });
    }
});

// /v1/test
router.get("/test", verifyToken, (req, res) => {
    res.json(req.decoded);
});

module.exports = router;
