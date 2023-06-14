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

  user_no = req.session.user_no;

  if (user_no) {
    sql = `SELECT * FROM user WHERE user_no = ?`;
    const [user] = await conn.query(sql, user_no);

    res.render("modify", { user: user[0] });
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

  user_id = req.body.userId;
  user_pw = req.body.userPw;

  sql =
    "select user_no, user_name, user_lv, count(*) as rowCount from user where user_id = ? and user_pw = ?";
  const [user] = await conn.query(sql, [user_id, user_pw]);

  if (user[0].rowCount) {
    req.session.user_no = user[0].user_no; // 세션에 회원번호 저장
    req.session.user_name = user[0].user_name; // 세션에 회원이름 저장
    req.session.user_lv = user[0].user_lv; // 세션에 회원레벨 저장

    res.send({ user_name: req.session.user_name });
  } else {
    res.send({ loginFailed: true });
  }

  conn.release();
};

// 아이디 중복 확인 처리 - /user/join
exports.overlapUserId = async (req, res) => {
  const conn = await db().getConnection();

  user_id = req.body.userId;

  sql = "select user_id from user where user_id = ?";
  const [user] = await conn.query(sql, user_id);

  if (user[0]) {
    res.send(true);
  } else {
    res.send(false);
  }

  conn.release();
};

// 회원가입 처리 - /user/join
exports.joinPost = (req, res) => {
  userId = req.body.userId;
  userPw = req.body.userPw;
  userName = req.body.userName;
  userPhone = req.body.userPhone;
  userZipCode = req.body.userZipCode;
  userAddress = req.body.userAddress;
  userDetailAddress = req.body.userDetailAddress;

  sql =
    "insert into user(user_id, user_pw, user_name, user_phone, user_zipcode, user_address, user_detail_address, user_lv) values(?, ?, ?, ?, ?, ?, ?, 'user')";
  db.query(
    sql,
    [
      userId,
      userPw,
      userName,
      userPhone,
      userZipCode,
      userAddress,
      userDetailAddress,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ sqlError: err });
      } else {
        // 영향이 있는 행이 없다면 오류 전송
        if (result.affectedRows < 1) {
          res.send({ sqlError: result });
        } else {
          res.send();
        }
      }
    }
  );
};

// 장바구니 페이지 - /user/basket
exports.basket = async (req, res) => {
  const conn = await db().getConnection();

  // 로그인 여부 확인
  user_no = req.session.user_no;

  // 장바구니 상품 개수
  sql =
    "select count(user_no) as basketListCount from basket, options natural join product natural join image where user_no = ?;";
  const [basket_list_count] = await conn.query(sql, user_no);

  sql = `SELECT basket_no, file_save_name, file_show_name, product_name, basket.option_no, option_name, basket.option_num, product_price 
    FROM basket, options
    NATURAL JOIN product 
    NATURAL JOIN image 
    WHERE basket.user_no = ? 
    AND basket.option_no = options.option_no 
    ORDER BY basket_datetime desc, basket_no desc;`;

  // 장바구니 상품 리스트
  const [basket_list] = await conn.query(sql, user_no);

  // 로그인 상태일 경우
  if (user_no) {
    // 장바구니 상품 개수와 장바구니 상품 리스트를 렌더링
    res.render("basket", {
      basketListCount: basket_list_count[0].basketListCount,
      basketList: basket_list,
    });
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

  user_no = req.session.user_no;

  if (user_no) {
    // 주문 내역 개수
    sql = `SELECT count(user_no) AS order_list_count FROM orders WHERE user_no = ?;`;
    const [order_list_count] = await conn.query(sql, user_no);

    // 주문 내역 리스트
    sql = `SELECT file_save_name, product_name, option_name, detail.product_price, detail.option_num, order_totalPrice, order_status, order_date, order_status
      FROM orders, detail, options, product, image 
      WHERE orders.order_no = detail.order_no 
      AND detail.option_no = options.option_no 
      AND options.product_no = product.product_no 
      AND product.product_no = image.product_no 
      AND user_no = ? 
      ORDER BY order_date DESC;`;
    const [order_list] = await conn.query(sql, user_no);

    res.render("orderInfo", {
      order_list: order_list,
      order_list_count: order_list_count[0].order_list_count,
    });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }

  conn.release(); // 커넥션 반환
};
