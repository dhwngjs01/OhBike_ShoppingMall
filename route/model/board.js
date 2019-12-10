var db = require('../../db');

// 글 목록
exports.board = (req, res) => {
	max = 10; // 페이지당 게시글
	pno = req.query.page; // 페이지 넘버

	if(!pno)
		pno = 1; // 페이지 넘버 없을시 1로 초기화

	start = max * pno - max; // 디비에서 가져올 board 시작넘버
	user_no = req.session.user_no; // 회원번호 - 세션

	sql = 'select count(*) as count from board'; // 총 게시글 개수 가져오기
	db.query(sql, (err, result) => {
		if(err)
			console.log(err);
		else {
			var count = result[0].count;
			sql = "select * from board natural join member order by board_no desc limit ?, ?"; // 현재 페이지에 가져올 글
			db.query(sql, [start, max], (err, board) => {
				if(err)
					console.log(err);
				else {
					pager = {
						pagecount : count % max == 0 ? Math.trunc(count / max) : Math.trunc(count / max) + 1, // 총 페이지 수
						startpost : max * pno - max, // 시작 번호
						endpost : max * pno - 1 < count ? max * pno - 1 : count - 1 // 마지막시험번호
					};

					res.render('boardlist', { list : board, pager : pager, pno : pno, user_no : user_no }); // boardlist에 {}안에 있는 변수들 넘겨줌
				}
			});
		}
	});
}

// 글 읽기 페이지
exports.read = (req, res) => {
	no = req.query.no; // 현재 글 넘버
	user_no = req.session.user_no; // 회원번호 - 세션

	sql = "select * from board natural join user where board_no = ?";
	db.query(sql, no, (err, result) => {
		if(err)
			console.log(err);
		else {
			res.render('boardread', { board : result[0], user_no : user_no });
		}
	});
}

// 글 쓰기 페이지
exports.writePage = (req, res) => {
	res.render('boardwrite');
}

// 글 쓰기
exports.write = (req, res) => {
	title = req.body.title;
	content = req.body.content;
	user_no = req.session.user_no;

	sql = "insert into board(user_no, board_title, board_content) values(?, ?, ?)";
	db.query(sql, [user_no, title, content], (err, result) => {
		if(err){
			console.log(err);
			res.send({ flag : false });
		} else {
			if(result.affectedRows){ // 영향받은 Row가 있으면 실행
				insertId = result.insertId; // insert시킨 board_no
				res.send({ flag : true, insertId : insertId });
			} else {
				res.send({ flag : false });
			}
		}
	});
}
// 글 수정 페이지
exports.updatePage = (req, res) => {
	no = req.query.no;
	user_no = req.session.user_no;

	sql = "select * from board natural join user where board_no = ?";
	db.query(sql, no, (err, result) => {
		if(err) console.log(err)
		else {
			res.render('boardupdate', { board : result[0], user_no : user_no });
		}
	});
}

// 글 수정
exports.update = (req, res) => {
	no = req.body.no;
	title = req.body.title;
	content = req.body.content;

	sql = "update board set board_title = ?, board_content = ? where board_no = ?";
	db.query(sql, [title, content, no], (err, result) => {
		if(err){
			console.log(err);

			res.send(false);
		} else {
			console.log(result);

			if(result.affectedRows){
				res.send(true);
			} else {
				res.send(false);
			}
		}
	});
}

// 글 삭제
exports.delete = (req, res) => {
	no = req.body.no;

	sql = "delete from board where board_no = ?";
	db.query(sql, no, (err, result) => {
		if(err){
			console.log(err);
			res.send(false);
		} else {
			if(result.affectedRows){
				res.send(true);
			}
		}
	});
}