const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const Sequelize = require("sequelize");

const router = express.Router();
const client = redis.createClient();

// /auth/email 이메일 중복 확인
router.post("/email", async (req, res, next) => {
    const { email } = req.body;

    try {
        const exUser = await User.findOne({ where: { email: email } });

        if (exUser) {
            // 이미 존재하는 이메일인 경우
            return res.status(200).json({
                code: "10100",
                message: "Existed User",
                data: {},
            });
        }
        return res.status(200).json({ code: "10000", message: "Email OK", data: {} });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/signup 회원가입
router.post("/signup", async (req, res, next) => {
    // 이메일 중복 시, 회원가입 신청이 안되도록 프론트에서 처리
    const { email, password, username, nickname, language, country } = req.body;

    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            password: hash,
            username,
            nickname,
            language,
            country,
        });

        return res.status(200).json({ code: "10000", message: "Sign OK", data: {} });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/signin 로그인
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const exUser = await User.findOne({ where: { email: email } });

        if (!exUser) {
            // 이메일이 존재하지 않는 경우
            return res.status(200).json({
                code: "10101",
                message: "Not Existed User",
                data: {},
            });
        }

        const compareResult = await bcrypt.compare(password, exUser.password);

        if (!compareResult) {
            // 비밀번호가 일치하지 않는 경우
            return res.status(200).json({
                code: "10102",
                message: "Password Error",
                data: {},
            });
        }

        // 현재 시간으로 accessed_at 수정, ip 추가
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        User.update(
            {
                accessed_at: Sequelize.fn("NOW"),
                ip: ip,
            },
            {
                where: {
                    email: email,
                },
            }
        );

        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
            expiresIn: "14d",
        });

        // 서버에서 나중에 작업할 때 필요한 것들을 accessToken에 넣어준다
        const accessToken = jwt.sign(
            { idx: exUser.idx, nickname: exUser.nickname, role: exUser.role, country: exUser.country },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // redis에 refreshToken=accessToken 으로 저장
        client.set(refreshToken, accessToken);

        return res.status(200).json({
            code: "10000",
            message: "Login OK",
            data: { accessToken: accessToken, refreshToken: refreshToken },
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/token 토큰 재발급
router.post("/token", async (req, res, next) => {
    try {
        const { accessToken, refreshToken, isUpdated } = req.body;

        client.get(refreshToken, (err, value) => {
            if (err) {
                // redis에 refreshToken이 존재하지 않는 경우
                return res.status(200).json({
                    code: "10103",
                    message: "RefreshToken Error",
                    data: {},
                });
            }

            if (accessToken !== value) {
                // accessToken이 일치하지 않는 경우
                return res.status(200).json({
                    code: "10104",
                    message: "AccessToken Error",
                    data: {},
                });
            }

            const decoded = jwt.decode(accessToken, process.env.JWT_SECRET);
            let tokenInfo = { idx, nickname, role, country };

            // 프로필 수정 이후에 토큰을 재발급 받는 경우, DB에서 User를 가져오는 것이 안전하다.
            if (isUpdated) {
                async () => {
                    const exUser = await User.findOne({ where: { idx: decoded.payload.idx } });
                    tokenInfo = { idx: exUser.idx, nickname: exUser.nickname, role: exUser.role, country: exUser.country };
                };
            } else {
                // accessToken이 만료되어서 재발급 받는 경우
                tokenInfo = {
                    idx: decoded.payload.idx,
                    nickname: decoded.payload.nickname,
                    role: decoded.payload.role,
                    country: decoded.payload.country,
                };
            }

            const newAccessToken = jwt.sign(tokenInfo, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            return res.status(200).json({
                code: "10000",
                message: "Token OK",
                data: { token: newAccessToken },
            });
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/password 비밀번호 변경
router.post("/password", async (req, res, next) => {
    const { idx, password } = req.body;

    try {
        // 변경하는 비밀번호가 이전 비밀번호랑 같으면 ? 1. 신경 안쓰고 디비에 넣는다. : 2. 디비에 넣기 전 검사하고, 프론트에는 항상 ok로 보낸다.
        const hash = await bcrypt.hash(password, 12);
        User.update(
            {
                password: hash,
                updated_at: Sequelize.fn("NOW"),
            },
            {
                where: {
                    idx: idx,
                },
            }
        );

        return res.status(200).json({
            code: "10000",
            message: "Password OK",
            data: {},
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/signout 탈퇴
router.post("/signout", async (req, res, next) => {
    const { idx } = req.body;
    try {
        // DB에 탈퇴 여부 속성 추가해야할듯? 아님 다르게 구현
        User.update(
            {
                status: false,
            },
            {
                where: {
                    idx: idx,
                },
            }
        );

        return res.status(200).json({
            code: "10000",
            message: "Signout OK",
            data: {},
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// /auth/logout 로그아웃
// 여기서도 accessed_at 고려해야하는지?
router.post("/logout", async (req, res, next) => {
    const { accessToken, refreshToken } = req.body;

    try {
        redis.del(refreshToken);

        const decoded = jwt.decode(accessToken, process.env.JWT_SECRET);

        redis.set(accessToken, "logout", "EX", decoded.exp - decoded.iat);

        return res.status(200).json({
            code: "10000",
            message: "Signout OK",
            data: {},
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;
