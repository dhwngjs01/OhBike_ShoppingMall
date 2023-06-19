var db = require("../../db");

exports.dashboard = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `select 
  (select count(*) from detail where order_status = '배송준비중') as ready_status_count, 
  (select count(*) from detail where order_status = '배송중') as shipping_status_count, 
  (select count(*) from options where option_num = 0) as product_lack_count, 
  (select max(order_date) from orders) as last_order_date, 
  (select max(user_date) from user) as last_user_date`;
  const [dashboard_card_data] = await conn.query(sql);

  const ready_status_count = dashboard_card_data[0].ready_status_count;
  const shipping_status_count = dashboard_card_data[0].shipping_status_count;
  const product_lack_count = dashboard_card_data[0].product_lack_count;
  const last_order_date = dashboard_card_data[0].last_order_date
    ? dashboard_card_data[0].last_order_date
    : "";
  const last_user_date = dashboard_card_data[0].last_user_date;

  var sql = `SELECT file_save_name, product_name, option_name, detail.option_num, detail.product_price, user_name, order_status, order_date 
        FROM orders, detail, options, product, image, user 
        WHERE orders.order_no = detail.order_no 
        AND detail.option_no = options.option_no 
        AND options.product_no = product.product_no 
        AND product.product_no = image.product_no 
        AND orders.user_no = user.user_no 
        ORDER BY order_date DESC;`;

  var [rows] = await conn.query(sql);
  const order_list = rows;

  var sql = `SELECT * FROM user;`;
  var [rows] = await conn.query(sql);
  const user_list = rows;

  res.render("dashboard", {
    ready_status_count,
    shipping_status_count,
    product_lack_count,
    last_order_date,
    last_user_date,
    order_list,
    user_list,
  });

  conn.release();
};

exports.user = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `SELECT max(user_date) AS last_user_signup_date 
            FROM user`;
  var [rows] = await conn.query(sql);
  const last_user_signup_date = rows[0].last_user_signup_date;

  var sql = `SELECT * 
            FROM user`;
  var [rows] = await conn.query(sql);
  const user_list = rows;

  res.render("user", { user_list, last_user_signup_date });

  conn.release();
};

exports.product = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `SELECT max(product_date) AS lastProductDate 
            FROM product`;
  var [rows] = await conn.query(sql);
  const last_product_date = rows[0].lastProductDate;

  var sql = `SELECT * 
            FROM product 
            NATURAL JOIN image`;
  var [rows] = await conn.query(sql);
  const product_list = rows;

  res.render("product", { product_list, last_product_date });

  conn.release();
};

exports.productAddPage = async (req, res) => {
  res.render("productAdd");
};

exports.productModifyPage = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.query.product_no;

  const sql = `SELECT * 
        FROM product 
        NATURAL JOIN image 
        NATURAL JOIN options 
        WHERE product_no = ?`;
  var [rows] = await conn.query(sql, product_no);

  const product = {};

  product.product_no = rows[0].product_no;
  product.product_name = rows[0].product_name;
  product.product_en_name = rows[0].product_en_name;
  product.product_brand = rows[0].product_brand;
  product.product_category = rows[0].product_category;
  product.product_contents = rows[0].product_contents;
  product.product_price = rows[0].product_price;
  product.file_save_name = rows[0].file_save_name;
  product.file_show_name = rows[0].file_show_name;
  product.option_list = [];

  for (var i = 0; i < rows.length; i++) {
    product.option_list.push({
      option_no: rows[i].option_no,
      option_name: rows[i].option_name,
      option_num: rows[i].option_num,
    });
  }

  res.render("productModify", { product });

  conn.release();
};

exports.changeProductStatus = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.body.product_no;

  var sql = `UPDATE product 
            SET product_enable = not product_enable
            WHERE product_no = ?`;
  var [result] = await conn.query(sql, [product_no]);

  if (result.affectedRows) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }

  conn.release();
};

exports.order = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `SELECT detail_no, product_name, option_name, detail.option_num, detail.product_price, user_name, order_status, order_date
            FROM orders, detail, options, product, user
            WHERE orders.order_no = detail.order_no
            AND detail.option_no = options.option_no
            AND options.product_no = product.product_no
            AND orders.user_no = user.user_no
            ORDER BY order_date DESC;`;
  var [rows] = await conn.query(sql);
  const order_list = rows;

  order_status_list = ["배송준비중", "배송중", "배송완료", "주문취소"];

  res.render("order", { order_list, order_status_list });

  conn.release();
};

exports.changeOrderStatus = async (req, res) => {
  const conn = await db().getConnection();

  const order_status = req.body.order_status;
  const detail_no = req.body.detail_no;

  var sql = `UPDATE detail 
            SET order_status = ? 
            WHERE detail_no = ?`;
  const [result] = await conn.query(sql, [order_status, detail_no]);

  if (result.affectedRows) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }

  conn.release();
};

exports.productAdd = async (req, res) => {
  const conn = await db().getConnection();

  const product_name = req.body.product_name;
  const product_en_name = req.body.product_en_name;
  const product_brand = req.body.product_brand;
  const product_category = req.body.product_category;
  const product_contents = req.body.product_contents;
  const product_price = req.body.product_price;

  const option_name = req.body.option_name;
  const option_num = req.body.option_num;

  const file = req.files[0];
  const file_save_name = file && file.filename;

  if (file === undefined) {
    res.send({ success: false, message: "이미지를 선택해주세요." });
    return;
  }

  var sql = `INSERT INTO product (product_name, product_en_name, product_brand, product_category, product_contents, product_price)
              VALUES (?, ?, ?, ?, ?, ?)`;
  var [result] = await conn.query(sql, [
    product_name,
    product_en_name,
    product_brand,
    product_category,
    product_contents,
    product_price,
  ]);

  const product_no = result.insertId; // 상품 등록 후 상품 번호

  // 상품 등록 성공
  if (result.affectedRows) {
    var sql = "";

    for (var i = 0; i < option_name.length; i++) {
      sql += `INSERT INTO options (product_no, option_name, option_num)
              VALUES (${product_no}, '${option_name[i]}', ${option_num[i]});`;
    }
    var [result] = await conn.query(sql);

    // 재고 등록 성공
    if (result[0].affectedRows) {
      var sql = `INSERT INTO image (product_no, file_show_name, file_save_name)
                VALUES (?, ?, ?)`;
      var [result] = await conn.query(sql, [
        product_no,
        product_name,
        file_save_name,
      ]);

      // 이미지 등록 성공
      if (result.affectedRows) {
        res.send({ success: true, message: "상품이 등록되었습니다." });
      } else {
        // 이미지 등록 실패
        res.send({ success: false, message: "이미지 등록에 실패하였습니다." });
      }
    } else {
      // 재고 등록 실패
      res.send({ success: false, message: "재고 등록에 실패하였습니다." });
    }
  } else {
    // 상품 등록 실패
    res.send({ success: false, message: "상품 등록에 실패하였습니다." });
  }

  conn.release();
};

exports.productModify = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.body.product_no;
  const product_name = req.body.product_name;
  const product_en_name = req.body.product_en_name;
  const product_brand = req.body.product_brand;
  const product_category = req.body.product_category;
  const product_contents = req.body.product_contents;
  const product_price = req.body.product_price;

  const option_no = req.body.option_no;
  const option_name = req.body.option_name;
  const option_num = req.body.option_num;

  const file = req.files[0];
  const file_save_name = file && file.filename;

  if (file === undefined) {
    res.send({ success: false, message: "이미지를 선택해주세요." });
    return;
  }

  var sql = `UPDATE product
            SET product_name = ?, product_en_name = ?, product_brand = ?, product_category = ?, product_contents = ?, product_price = ?
            WHERE product_no = ?`;
  var [result] = await conn.query(sql, [
    product_name,
    product_en_name,
    product_brand,
    product_category,
    product_contents,
    product_price,
    product_no,
  ]);

  // 상품 수정 성공
  if (result.affectedRows) {
    var sql = "";

    for (var i = 0; i < option_no.length; i++) {
      sql += `UPDATE options
              SET option_name = ?, option_num = ?
              WHERE option_no = ?;`;
    }
    var [result] = await conn.query(sql, [option_name, option_num, option_no]);

    // 재고 수정 성공
    if (result.affectedRows) {
      var sql = `UPDATE image
                SET file_show_name = ?, file_save_name = ?
                WHERE product_no = ?`;
      var [result] = await conn.query(sql, [
        product_name,
        file_save_name,
        product_no,
      ]);

      // 이미지 수정 성공
      if (result.affectedRows) {
        res.send({ success: true, message: "상품이 수정되었습니다." });
      } else {
        // 이미지 수정 실패
        res.send({ success: false, message: "이미지 수정에 실패하였습니다." });
      }
    } else {
      // 재고 수정 실패
      res.send({ success: false, message: "재고 수정에 실패하였습니다." });
    }
  }

  conn.release();
};

exports.productImage = async (req, res) => {
  res.send({ url: "/ckeditor_upload/" + req.files[0].filename });
};

exports.deleteProduct = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.body.product_no;

  var sql = `DELETE FROM product
            WHERE product_no = ?`;
  var [product_delete_result] = await conn.query(sql, product_no);

  var sql = `DELETE FROM options
          WHERE product_no = ?`;
  var [options_delete_result] = await conn.query(sql, product_no);

  var sql = `DELETE FROM image
          WHERE product_no = ?`;
  var [image_delete_result] = await conn.query(sql, product_no);

  if (
    product_delete_result.affectedRows &&
    options_delete_result.affectedRows &&
    image_delete_result.affectedRows
  )
    res.send({ success: true });
  else res.send({ success: false });

  conn.release();
};
