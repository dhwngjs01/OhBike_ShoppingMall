var mysql = require("mysql");
var dbConfig = require("./config/db-config.json");

var db = mysql.createConnection({
  host: dbConfig.host, //db주소
  user: dbConfig.user, //아이디
  password: dbConfig.password, //비밀번호
  database: dbConfig.database, //스키마이름
  charset: "utf8", //문자셋
  multipleStatements: true, // 다중쿼리 허용
});

setInterval(function () {
  db.query("select 1+1");
}, 3600000);

// db.connect(); //접속
module.exports = db;
