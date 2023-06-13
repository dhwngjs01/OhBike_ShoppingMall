const mysql = require("mysql2/promise");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = () => {
  try {
    return mysql.createPool({
      host: DB_HOST, //db주소
      user: DB_USER, //아이디
      password: DB_PASSWORD, //비밀번호
      database: DB_DATABASE, //스키마이름
      charset: "utf8", //문자셋
      multipleStatements: true, // 다중쿼리 허용
      enableKeepAlive: true, //db 연결 유지
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
