const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const { sequelize } = require("./models");

dotenv.config();
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "session-cookie",
    })
);

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use((req, res, next) => {
    console.log("모든 요청에 다 실행됩니다.");
    next();
});

app.get(
    "/",
    (req, res, next) => {
        console.log("GET / 요청에서만 실행됩니다.");
        next();
    },
    (req, res) => {
        throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
    }
);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
