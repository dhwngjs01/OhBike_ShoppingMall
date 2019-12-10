const router = require('express').Router();
const main = require('../model/main');

// GET MAPPING
router.get('/', main.main) // 메인 페이지

module.exports = router