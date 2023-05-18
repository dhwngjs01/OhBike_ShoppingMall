var mysql = require("mysql");
require("dotenv").config();

var db = mysql.createConnection({
  host: process.env.DB_HOST, //db주소
  user: process.env.DB_USER, //아이디
  password: process.env.DB_PASSWORD, //비밀번호
  database: process.env.DB_DATABASE, //스키마이름
  charset: "utf8", //문자셋
  multipleStatements: true, // 다중쿼리 허용
});

setInterval(function () {
  db.query("select 1+1");
}, 3600000);

// db.connect(); //접속
module.exports = db;
