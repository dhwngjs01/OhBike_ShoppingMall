var db = require('../../db');

exports.main = (req, res) => {
	res.send(req.body);
}

exports.admin = (req, res) => {
	res.send(req.body);
}