var mysql = require('mysql');

var db = mysql.createConnection({
	host : '114.71.137.109', //db주소
	user : '201844021', //아이디
	password: '201844021',//비밀번호
	database: 'SW_201844021', //스키마이름
	charset : 'utf8' //문자셋
});
// db.connect(); //접속
module.exports = db;
