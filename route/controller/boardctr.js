const router = require('express').Router();
const board = require('../model/board');

// GET MAPPING
router.get('/read', board.read); // 글 읽기 페이지
router.get('/writepage', board.writePage); // 글 쓰기 페이지
router.get('/updatepage', board.updatePage); // 글 수정 페이지

// POST MAPPING
router.post('/delete', board.delete); // 글 삭제
router.post('/write', board.write); // 글 쓰기
router.post('/update', board.update); // 글 수정

module.exports = router;