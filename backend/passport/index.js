const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

const passportConfig = { usernameField: "email", passwordField: "password" };

const passportVerify = async (email, password, done) => {
    try {
        const exUser = await User.findOne({ where: { email: email } });
        if (!exUser) {
            done(null, false, { message: "Not Existed User" });
            return;
        }

        const compareResult = await bcrypt.compare(password, exUser.password);

        if (compareResult) {
            done(null, exUser);
            return;
        }

        done(null, false, { message: "Not correct password" });
    } catch (error) {
        console.error(error);
        done(error);
    }
};

const JWTConfig = {
    // jwtFromRequest: request에서 JWT의 위치설정, fromHeader: header의 authorization에서 JWT를 가져올 수 있도록 설정
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,
};

const JWTVerify = async (jwtPayload, done) => {
    try {
        // email값이 아닌 id값으로 빠르게 유저 탐색
        const exUser = await User.findOne({ where: { id: jwtPayload.id } });
        if (exUser) {
            done(null, exUser);
            return;
        }
        done(null, false, { message: "Unauthorizated Token" });
    } catch (error) {
        console.error(error);
        done(error);
    }
};

module.exports = () => {
    passport.use("local", new LocalStrategy(passportConfig, passportVerify));
    passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
