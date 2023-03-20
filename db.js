var mysql = require('mysql2');

var db = mysql.createConnection({
	host : 'localhost', //db주소
	user : 'root', //아이디
	password: 'P@ssw0rd',//비밀번호
	database: 'SW_201844021', //스키마이름
	charset : 'utf8' //문자셋
});
// db.connect(); //접속
module.exports = db;
