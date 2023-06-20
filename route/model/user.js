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

// 회원정보수정 - GET /user/modify
exports.modifyPage = async (req, res) => {
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

// 회원정보수정 - PUT /user/:user_no
exports.modify = async (req, res) => {
  const conn = await db().getConnection();

  const user_no = req.session.user_no;

  if (user_no) {
    var user_pw = req.body.user_pw;
    const user_pw2 = req.body.user_pw2;
    const user_name = req.body.user_name;
    const user_phone = req.body.user_phone;
    const user_zipcode = req.body.user_zipcode;
    const user_address = req.body.user_address;
    const user_detail_address = req.body.user_detail_address;

    if (user_pw != user_pw2) {
      res.send({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });

      return;
    }

    var sql = `SELECT user_pw FROM user WHERE user_no = ?`;
    const [rows] = await conn.query(sql, user_no);
    const user = rows[0];

    if (user_pw == "") {
      user_pw = user.user_pw;
    }

    var sql = `UPDATE user 
              SET user_pw = ?, user_name = ?, user_phone = ?, user_zipcode = ?, user_address = ?, user_detail_address = ? 
              WHERE user_no = ?`;
    const [result] = await conn.query(sql, [
      user_pw,
      user_name,
      user_phone,
      user_zipcode,
      user_address,
      user_detail_address,
      user_no,
    ]);

    if (result.affectedRows > 0) {
      res.send({
        success: true,
        message: "회원정보가 수정되었습니다.",
      });
    } else {
      res.send({
        success: false,
        message: "알 수 없는 오류가 발생했습니다.\n새로고침 후 이용해주세요.",
      });
    }
  } else {
    res.send({
      success: false,
      message: "로그인 후 이용할 수 있는 서비스입니다.",
    });
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
exports.basketDeletePost = async (req, res) => {
  const conn = await db().getConnection();

  const user_no = req.session.user_no; // 로그인 여부 확인
  const basket_no_list = JSON.parse(req.body.basket_no_list); // 배열로 받은 상품(장바구니 번호)

  // 로그인 상태가 아닐 경우
  if (user_no === undefined) {
    res.send({ message: "로그인 후 이용할 수 있는 서비스입니다." });
    return;
  }

  var sql = "";

  // 배열로 받은 상품(장바구니 번호)만큼 반복
  basket_no_list.forEach((basket_no) => {
    // 쿼리문 생성
    sql += `DELETE FROM basket 
          WHERE basket_no = ${basket_no}
          AND user_no = ${user_no};`;
  });

  // 장바구니 삭제 쿼리문 실행
  const [delete_basket_result] = await conn.query(sql);

  if (delete_basket_result.affectedRows < 1) {
    res.send({ message: "장바구니에 담긴 상품이 삭제되지 않았습니다." });
    return;
  }

  res.send({
    success: true,
    message: "장바구니에 담긴 상품이 삭제되었습니다.",
  });

  conn.release();
};

// 주문 조회 페이지 - /user/orderInfo
exports.orderInfo = async (req, res) => {
  const conn = await db().getConnection(); // 커넥션 생성

  const user_no = req.session.user_no;

  if (user_no) {
    // 주문 내역
    var sql = `SELECT orders.order_no, count(*) as order_list_count 
              FROM orders, detail 
              WHERE orders.order_no = detail.order_no 
              AND user_no = ? 
              GROUP BY orders.order_no
              ORDER BY orders.order_no DESC;`;

    var [rows] = await conn.query(sql, user_no);
    const order_list = rows;

    // 주문 상세
    var sql = `SELECT orders.order_no, file_save_name, product_name, option_name, detail.product_price, detail.option_num, order_totalPrice, order_status, order_date, order_status
      FROM orders, detail, options, product, image 
      WHERE orders.order_no = detail.order_no 
      AND detail.option_no = options.option_no 
      AND options.product_no = product.product_no 
      AND product.product_no = image.product_no 
      AND user_no = ? 
      ORDER BY order_date DESC;`;
    var [rows] = await conn.query(sql, user_no);
    const detail_list = rows;

    // 주문내역에 주문 상세 입력
    order_list.forEach((order) => {
      order.detail_list = [];

      detail_list.forEach((detail) => {
        if (order.order_no == detail.order_no) {
          order.detail_list.push(detail);
        }
      });
    });

    res.render("orderInfo", { order_list });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }

  conn.release(); // 커넥션 반환
};

// 회원탈퇴 페이지 - /user/dieMySelf
exports.dieMySelfPage = (req, res) => {
  res.render("dieMySelf");
};

// 회원탈퇴 처리 - /user/dieMySelf
exports.dieMySelf = async (req, res) => {
  const conn = await db().getConnection();

  const user_no = req.session.user_no;

  if (user_no) {
    var sql = `SELECT user_pw FROM user WHERE user_no = ?`;
    const [rows] = await conn.query(sql, user_no);

    const user_pw = rows[0].user_pw;

    if (user_pw != req.body.user_pw) {
      res.send({
        password_invalid: true,
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      var sql = `DELETE FROM user WHERE user_no = ?`;
      const [result] = await conn.query(sql, user_no);

      if (result.affectedRows > 0) {
        req.session.destroy(function () {
          res.send({
            success: true,
            message: "회원탈퇴가 완료되었습니다.",
          });
        });
      } else {
        res.send({
          message: "알 수 없는 오류가 발생했습니다.\n새로고침 후 이용해주세요.",
        });
      }
    }
  } else {
    res.send({
      message: "로그인 후 이용할 수 있는 서비스입니다.",
    });
  }

  conn.release();
};
