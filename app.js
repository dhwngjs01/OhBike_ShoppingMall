{
  // 서버설정###################################
  var express = require("express");
  var bodyParser = require("body-parser");
  var app = express();
  var session = require("express-session");
  var mss = require("express-mysql-session")(session);
  var url = require("url");
  require("dotenv").config();

  // 세션 설정
  var option = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: "utf8",
  };

  var sstore = new mss(option);
  app.locals.pretty = true; // 페이지 렌더링 할때 코드들 이쁘게 변환 시켜줌
  app.set("view engine", "pug"); // pug 템플릿 엔진으로 설정
  app.set("views", ["./view/user", "./view/admin", "./view/", "./view/public"]); // front-end 파일의 경로
  app.use(express.static(__dirname + "/resources")); // resources 경로
  app.use("/", express.static(__dirname + "/resources")); // resources 경로
  app.use("/images", express.static(__dirname + "/resources/images")); // images 경로
  app.use("/uploadFiles", express.static(__dirname + "/resources/uploadFiles")); // uploadFiles 경로
  app.use("/node_modules", express.static(__dirname + "/node_modules")); // node_modules 경로
  app.use(bodyParser.urlencoded({ extended: true })); // post 방식 사용시 req.body로 값을 받아오기 위해 사용
  app.use(bodyParser.json()); // post 방식 사용 시 req.body로 값을 받아오기위해 사용

  // 세션
  app.use(
    session({
      secret: "test",
      resave: false,
      saveUninitialized: true,
      store: sstore,
    })
  );

  // 세션 공유
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

  // Controller
  app.use("/", require("./route/controller/mainctr")); // 메인 관련 라우팅
  app.use("/user/", require("./route/controller/userctr")); // 회원 관련 라우팅
  app.use("/public/", require("./route/controller/publicctr")); // 공용 관련 라우팅
  app.use("/admin/", require("./route/controller/adminctr")); // 관리자 관련 라우팅
  app.listen(process.env.LISTEN_PORT, () => {
    console.log(`Conneted ${process.env.LISTEN_PORT} port`);
  });
}

// 날짜 형식 함수
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};

String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

String.prototype.numberWithCommas = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Number.prototype.numberWithCommas = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
