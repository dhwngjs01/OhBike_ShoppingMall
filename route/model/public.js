var db = require("../../db");

// 상품목록 페이지
exports.productListPage = async (req, res) => {
  const conn = await db().getConnection();

  const path = req.path.substring(1);

  let category = "";
  switch (path) {
    case "helmet":
      category = "헬멧";
      break;
    case "ridingWear":
      category = "라이딩웨어";
      break;
    case "gloves":
      category = "장갑";
      break;
    case "boots":
      category = "부츠";
      break;
    case "protection":
      category = "보호구";
      break;
    default:
      break;
  }

  sql = `SELECT DISTINCT product_brand, product_category 
        FROM product 
        WHERE product_category = ? 
        AND product_enable = 1 
        ORDER BY product_brand;`;

  const [brand_list] = await conn.query(sql, category);

  res.render("productList", { category, brand_list });

  conn.release();
};

// 상품목록 뿌려주기
exports.getProductList = async (req, res) => {
  const conn = await db().getConnection();

  const product_category = req.body.category;
  const product_brand_arr = JSON.parse(req.body.brand);

  // 상품 브랜드 쿼리문 생성
  var product_brand_sql = "";
  if (product_brand_arr.length > 0) {
    product_brand_sql = "AND";

    product_brand_arr.forEach((product_brand, key) => {
      product_brand_sql += ` product_brand = '${product_brand}' OR`;
    });

    product_brand_sql = product_brand_sql.substring(
      0,
      product_brand_sql.length - 3
    );
  }

  // 상품 개수 구하기 쿼리문 생성 및 실행
  var sql = `SELECT count(product_no) AS product_count 
            FROM product 
            WHERE product_category = ? ${product_brand_sql}`;
  var [rows] = await conn.query(sql, product_category);
  const product_count = rows[0].product_count;

  // 상품 목록 쿼리문 생성 및 실행
  var sql = `SELECT * 
            FROM product 
            NATURAL JOIN image 
            WHERE product_category = ? ${product_brand_sql} 
            ORDER BY product_brand;`;
  var [rows] = await conn.query(sql, product_category);
  const product_list = rows;

  res.render("ajaxProductList", { product_list, product_count });

  conn.release();
};

// 상품 검색
exports.searchProduct = async (req, res) => {
  const conn = await db().getConnection();

  const keyword = req.query.keyword;

  // 상품 개수 구하기 쿼리문 생성 및 실행
  var sql = `SELECT count(product_no) AS product_count 
            FROM product 
            WHERE product_name LIKE ? 
            OR product_brand LIKE ?;`;
  var [rows] = await conn.query(sql, [`%${keyword}%`, `%${keyword}%`]);
  const product_count = rows[0].product_count;

  // 상품 목록 쿼리문 생성 및 실행
  var sql = `SELECT * 
            FROM product 
            NATURAL JOIN image 
            WHERE product_name LIKE ?
            OR product_brand LIKE ?;`;
  var [rows] = await conn.query(sql, [`%${keyword}%`, `%${keyword}%`]);
  const product_list = rows;

  res.render("searchProductList", { product_list, product_count, keyword });

  conn.release();
};

// 상품 상세 페이지
exports.productDetail = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.query.productNo;

  // 상품 정보 쿼리문 생성
  sql = `SELECT * 
        FROM product 
        NATURAL JOIN image 
        WHERE product_no = ?;`;
  var [rows] = await conn.query(sql, product_no);
  const product = rows[0];

  // 상품 옵션 쿼리문 생성
  sql = `SELECT * 
        FROM options 
        WHERE product_no = ?;`;
  var [rows] = await conn.query(sql, product_no);
  const option_list = rows;

  // 상품 상세 페이지 렌더링 (productDetail.jade)
  res.render("productDetail", { product, option_list });

  conn.release();
};

// 상품 결제 페이지
exports.payment = async (req, res) => {
  const conn = await db().getConnection();

  const user_no = req.session.user_no; // 로그인한 유저의 번호
  const product_no = req.body.product_no; // 상품 번호들
  const option_no_list = req.body.option_no; // 옵션 번호들
  const option_num_list = req.body.option_num; // 옵션 개수들
  const basket_no_list =
    req.body.basket_no_list == undefined ? [] : req.body.basket_no_list; // 장바구니 번호들

  // true == 바로구매 버튼 클릭으로 폼을 전송했을 시
  // false == 장바구니 버튼 클릭으로 폼을 전송했을 시
  const direct_payment = JSON.parse(req.body.direct_payment); // 바로구매 여부

  // 상품 개수가 재고 개수보다 많은 수량을 주문시 확인하는 변수
  let option_num_over = false;

  // 상품 보기 페이지에서 바로구매, 장바구니 페이지에서 주문하기(선택한 상품 주문, 전체 주문) 버튼을 클릭했을 시
  if (direct_payment) {
    // 로그인한 유저의 정보를 가져옴
    var sql = `SELECT * FROM user WHERE user_no = ?`;
    var [rows] = await conn.query(sql, user_no);
    const user = rows[0];

    // 상품 정보를 가져옴
    var sql = `SELECT * 
              FROM product 
              NATURAL JOIN options 
              NATURAL JOIN image 
              WHERE`;

    // 상품 번호들을 배열로 만들어서 반복문을 돌림
    option_no_list.forEach(() => {
      sql += " option_no = ? OR"; // 상품 번호를 쿼리문에 추가
    });

    // 마지막에 붙은 or을 제거
    sql = sql.substring(0, sql.length - 3);

    // 상품 번호를 쿼리문에 추가
    var [rows] = await conn.query(sql, option_no_list);
    var product_list = rows;

    product_list.size = product_list.length; // 상품 개수
    product_list.total_product_price = 0; // 상품 총 가격

    product_list.forEach((product, key) => {
      // 상품 개수가 재고 개수보다 많은 수량을 주문할 시 뒤로가기
      if (product.option_num < option_num_list[key]) {
        option_num_over = true;
        msg = `재고보다 많은 수량을 주문할 수 없습니다. 
        
        주문하신 수량보다 재고가 부족한 상품 목록 
        ${product.product_name} (옵션 : ${product.option_name}) - 주문 가능한 수량 : ${product.option_num}개`;
      } else {
        // 재고가 충분할 시
        product_list[key].original_option_num = product.option_num; // 재고 개수 변수
        product_list[key].selected_option_num = option_num_list[key]; // 선택한 옵션 개수
        product_list.total_product_price +=
          product.product_price * option_num_list[key]; // 상품 총 가격
      }
    });

    // 상품 개수가 재고 개수보다 많은 수량을 주문할 시
    if (option_num_over) {
      // 뒤로가기
      res.send(`<script>alert(\`${msg}\`); history.back();</script>`);
    } else {
      // 결제 페이지 렌더링 (productPayment.jade)
      res.render("public/productPayment", {
        product_list, // 상품 정보와 옵션 정보
        basket_no_list,
        user, // 로그인한 유저의 정보
      });
    }

    // 장바구니 버튼 클릭으로 폼을 전송했을 시
  } else {
    // 장바구니에 이미 상품이 존재하는지 확인
    var sql = `SELECT basket_no, count(*) AS basket_item_count 
              FROM basket 
              WHERE user_no = ? 
              AND option_no = ?`;
    var [rows] = await conn.query(sql, [user_no, option_no_list]);
    const basket_no = rows[0].basket_no; // 장바구니 번호
    const basket_item_count = rows[0].basket_item_count; // 장바구니에 상품 개수

    if (basket_item_count > 0) {
      // 장바구니에 상품이 존재할 시
      // 장바구니에 상품이 존재할 시 옵션 개수를 업데이트
      var sql = `UPDATE basket SET option_num = option_num + ? WHERE basket_no = ?`;
      const [result] = await conn.query(sql, [option_num_list, basket_no]);
    } else {
      // 장바구니에 상품이 존재하지 않을 시
      // 장바구니에 상품을 추가
      sql = `INSERT INTO basket(user_no, product_no, option_no, option_num) VALUES (?, ?, ?, ?)`;

      [result] = await conn.query(sql, [
        user_no,
        product_no,
        option_no_list,
        option_num_list,
      ]);
    }

    // 장바구니 페이지로 리다이렉트
    if (result.affectedRows > 0) {
      res.redirect("/user/basket");
    } else {
      res.send(
        '<script>alert("장바구니에 담는데 실패했습니다."); history.back();</script>'
      );
    }
  }

  conn.release();
};

// 결제
exports.paymentFinal = async (req, res) => {
  const conn = await db().getConnection(); // 커넥션 생성

  // 로그인한 유저의 정보
  // (로그인한 유저만 결제 가능)
  // (로그인 안한 유저는 로그인 페이지로 리다이렉트) (로그인한 유저의 정보는 결제 완료 후 주문 테이블에 저장하기 위함)
  const order_data = {
    user_no: req.session.user_no,
    order_totalPrice: req.body.total_product_price,
    order_ship_name: req.body.order_ship_name,
    order_ship_phone: req.body.order_ship_phone,
    order_ship_zipcode: req.body.order_ship_zipcode,
    order_ship_address: req.body.order_ship_address,
    order_ship_detail_address: req.body.order_ship_detail_address,
    order_msg: req.body.order_msg,
  };

  // 장바구니에서 넘어온 상품일 시
  const basket_no_list =
    req.body.basket_no_list == undefined ? [] : req.body.basket_no_list;

  // 주문 테이블에 주문 정보 저장
  // 주문 번호를 생성하기 위해 주문 테이블에 데이터를 저장한 후 주문 번호를 가져옴
  // 주문 번호를 가져온 후 주문 상세 테이블에 주문 번호와 상품 번호, 옵션 번호, 옵션 개수를 저장
  var sql = `INSERT INTO orders SET ? returning order_no;`;
  var [insert_order_result] = await conn.query(sql, order_data);

  // 주문 테이블에 주문 정보 저장 성공
  if (insert_order_result[0].order_no) {
    const payment_size = req.body.payment_size; // 결제 상품 개수

    // 주문 상세 테이블에 저장할 데이터
    detail_data = {
      product_no: req.body.product_no, // 상품 번호
      order_no: insert_order_result[0].order_no, // 주문 번호
      option_no: req.body.option_no, // 옵션 번호
      option_num: req.body.option_num, // 옵션 개수
      product_price: req.body.product_price, // 상품 가격
    };

    // 주문 상세 테이블에 주문 상세 정보 저장 (주문 번호, 상품 번호, 옵션 번호, 옵션 개수, 상품 가격)
    var sql = "";
    for (i = 0; i < payment_size; i++) {
      sql += `INSERT INTO detail(product_no, order_no, option_no, option_num, product_price) 
              VALUES (${detail_data.product_no[i]}, ${detail_data.order_no}, ${detail_data.option_no[i]}, ${detail_data.option_num[i]}, ${detail_data.product_price[i]});`;
    }
    // 쿼리문 실행
    var [result] = await conn.query(sql);

    // 주문 상세 테이블에 주문 상세 정보 저장 성공
    if (result.affectedRows > 0) {
      // 상품 수량 감소 쿼리문 생성
      var sql = "";
      for (i = 0; i < payment_size; i++) {
        sql += `UPDATE options SET option_num = option_num - ${detail_data.option_num[i]} WHERE option_no = ${detail_data.option_no[i]};`;
      }
      // 쿼리문 실행
      var [result] = await conn.query(sql);

      // 상품 수량 감소 성공
      if (result.affectedRows > 0) {
        // 장바구니에서 넘어온 상품일 시
        if (basket_no_list.length > 0) {
          var sql = "";
          basket_no_list.forEach((basket_no) => {
            sql += `DELETE FROM basket WHERE basket_no = ${basket_no};`;
          });

          // 장바구니에서 넘어온 상품 삭제 쿼리문 실행
          var [result] = await conn.query(sql);

          // 장바구니에서 넘어온 상품 삭제 성공
          if (result.affectedRows > 0) {
            res.send({ orderSuccess: true });
          } else {
            // 장바구니에서 넘어온 상품 삭제 실패
            res.send({ basketDeleteFailed: true });
          }
        } else {
          res.send({ orderSuccess: true });
        }
      } else {
        // 상품 수량 감소 실패
        res.send({ optionUpdateFailed: true });
      }
    } else {
      res.send({ detailInsertFailed: true });
    }
  } else {
    res.send({ ordersInsertFailed: true });
  }

  conn.release();
};
