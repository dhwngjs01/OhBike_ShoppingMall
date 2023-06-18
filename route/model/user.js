var db = require("../../db");

// 로그인 페이지 - /user/login
exports.login = (req, res) => {
  if (req.session.user_no) {
    res.send(
      '<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>'
    );
  } else {
    res.render("login");
  }
};

// 회원가입 페이지 - /user/join
exports.join = (req, res) => {
  if (req.session.user_no) {
    res.send(
      '<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>'
    );
  } else {
    res.render("join");
  }
};

// 마이페이지 - /user/mypage
exports.mypage = (req, res) => {
  if (req.session.user_no) {
    res.render("mypage");
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }
};

// 회원정보수정 - /user/modify
exports.modify = async (req, res) => {
  const conn = await db().getConnection();

  const user_no = req.session.user_no;

  if (user_no) {
    var sql = `SELECT * FROM user WHERE user_no = ?`;
    const [rows] = await conn.query(sql, user_no);
    const user = rows[0];

    res.render("modify", { user });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }

  conn.release();
};

// 로그아웃 /user/logout
exports.logout = (req, res) => {
  req.session.destroy(function () {
    res.redirect("/");
  });
};

// 로그인 처리 - /user/login
exports.loginPost = async (req, res) => {
  const conn = await db().getConnection();

  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;

  var sql = `SELECT user_no, user_name, user_lv, count(*) as rowCount FROM user WHERE user_id = ? AND user_pw = ?`;
  const [rows] = await conn.query(sql, [user_id, user_pw]);
  const user = rows[0];

  if (user.rowCount) {
    req.session.user_no = user.user_no; // 세션에 회원번호 저장
    req.session.user_name = user.user_name; // 세션에 회원이름 저장
    req.session.user_lv = user.user_lv; // 세션에 회원레벨 저장

    res.send({ success: true, message: `${user.user_name} 님 환영합니다.` });
  } else {
    res.send({
      success: false,
      message: "아이디와 비밀번호를 다시 확인해주세요.",
    });
  }

  conn.release();
};

// 아이디 중복 확인 처리 - /user/join
exports.overlapUserId = async (req, res) => {
  const conn = await db().getConnection();

  const user_id = req.body.user_id;

  var sql = `select user_id from user where user_id = ?`;
  const [rows] = await conn.query(sql, user_id);
  const user = rows[0];

  if (user) {
    res.send(true);
  } else {
    res.send(false);
  }

  conn.release();
};

// 회원가입 처리 - /user/join
exports.joinPost = async (req, res) => {
  const conn = await db().getConnection();

  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;
  const user_name = req.body.user_name;
  const user_phone = req.body.user_phone;
  const user_zipcode = req.body.user_zipcode;
  const user_address = req.body.user_address;
  const user_detail_address = req.body.user_detail_address;

  var sql = `INSERT INTO user(user_id, user_pw, user_name, user_phone, user_zipcode, user_address, user_detail_address) 
    VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await conn.query(sql, [
    user_id,
    user_pw,
    user_name,
    user_phone,
    user_zipcode,
    user_address,
    user_detail_address,
  ]);

  // 회원가입 성공 시
  if (result.affectedRows > 0) {
    res.send({ success: true, message: "회원가입이 완료되었습니다." });
  } else {
    res.send({
      success: false,
      message: "알 수 없는 오류가 발생했습니다.\n새로고침 후 이용해주세요.",
    });
  }
};

// 장바구니 페이지 - /user/basket
exports.basket = async (req, res) => {
  const conn = await db().getConnection();

  // 로그인 여부 확인
  const user_no = req.session.user_no;

  // 장바구니 상품 개수
  var sql = `SELECT count(user_no) AS basket_list_count FROM basket where user_no = ?;`;
  var [rows] = await conn.query(sql, user_no);
  const basket_list_count = rows[0].basket_list_count;

  var sql = `SELECT basket_no, file_save_name, file_show_name, product_name, basket.option_no, option_name, basket.option_num, product_price 
            FROM basket, options 
            NATURAL JOIN product 
            NATURAL JOIN image 
            WHERE basket.user_no = ? 
            AND basket.option_no = options.option_no;`;

  // 장바구니 상품 리스트
  var [rows] = await conn.query(sql, user_no);
  const basket_list = rows;

  // 로그인 상태일 경우
  if (user_no) {
    // 장바구니 상품 개수와 장바구니 상품 리스트를 렌더링
    res.render("basket", { basket_list_count, basket_list });
  } else {
    // 로그인 상태가 아닐 경우
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }

  conn.release();
};

// 장바구니 상품 삭제 - /user/basket
exports.basketDeletePost = (req, res) => {
  user_no = req.session.user_no; // 로그인 여부 확인
  basket_no_list = JSON.parse(req.body.basket_no_list); // 배열로 받은 상품(장바구니 번호)

  // 로그인 상태일 경우
  if (user_no) {
    sql = "";

    // 장바구니 상품 삭제 쿼리문 생성 및 실행
    // 배열로 받은 상품(장바구니 번호)만큼 반복
    basket_no_list.forEach((basket_no) => {
      // 쿼리문 생성
      delete_basket_sql =
        "delete from basket where basket_no = ? and user_no = ?;";

      // 쿼리문에 값 삽입
      delete_basket_sql_format = db.format(delete_basket_sql, [
        basket_no,
        user_no,
      ]);

      // 쿼리문 조합
      sql += delete_basket_sql_format;
    });

    // 쿼리문 실행
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // 영향이 있는 행이 없다면 오류 전송
        if (result.affectedRows < 1) {
          res.send({ sqlError: result });
        } else {
          // 장바구니 상품 삭제 성공
          res.send("장바구니에 담긴 상품이 삭제되었습니다.");
        }
      }
    });
  } else {
    // 로그인 상태가 아닐 경우
    res.send("please_login");
  }
};

// 주문 조회 페이지 - /user/orderInfo
exports.orderInfo = async (req, res) => {
  const conn = await db().getConnection(); // 커넥션 생성

  const user_no = req.session.user_no;

  if (user_no) {
    // 주문 내역 개수
    var sql = `SELECT count(user_no) AS order_list_count FROM orders WHERE user_no = ?;`;
    var [rows] = await conn.query(sql, user_no);
    const order_list_count = rows[0].order_list_count;

    // 주문 내역 리스트
    var sql = `SELECT file_save_name, product_name, option_name, detail.product_price, detail.option_num, order_totalPrice, order_status, order_date, order_status
      FROM orders, detail, options, product, image 
      WHERE orders.order_no = detail.order_no 
      AND detail.option_no = options.option_no 
      AND options.product_no = product.product_no 
      AND product.product_no = image.product_no 
      AND user_no = ? 
      ORDER BY order_date DESC;`;
    var [rows] = await conn.query(sql, user_no);
    const order_list = rows;

    res.render("orderInfo", { order_list, order_list_count });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }

  conn.release(); // 커넥션 반환
};
