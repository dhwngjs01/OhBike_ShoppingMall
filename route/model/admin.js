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

  const [order_list] = await conn.query(sql);

  var sql = `SELECT * FROM user;`;
  const [user_list] = await conn.query(sql);

  res.render("dashboard", {
    ready_status_count,
    shipping_status_count,
    product_lack_count,
    last_order_date,
    last_user_date,
    order_list: order_list,
    user_list: user_list,
  });

  conn.release();
};

exports.user = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `select max(user_date) as last_user_signup_date from user`;
  var [rows, fields] = await conn.query(sql);
  const last_user_signup_date = rows[0].last_user_signup_date;

  var sql = `select * from user`;
  var [rows, fields] = await conn.query(sql);
  const user_list = rows;

  res.render("user", { user_list, last_user_signup_date });

  conn.release();
};

exports.product = async (req, res) => {
  const conn = await db().getConnection();

  var sql = `select max(product_date) as lastProductDate from product`;
  var [rows] = await conn.query(sql);
  const last_product_date = rows[0].lastProductDate;

  var sql = `select * from product natural join image`;
  var [rows] = await conn.query(sql);
  const product_list = rows;

  res.render("product", { product_list, last_product_date });

  conn.release();
};

exports.productAddPage = async (req, res) => {
  res.render("productAdd");
};

exports.productModify = async (req, res) => {
  const conn = await db().getConnection();

  const product_no = req.query.product_no;

  const sql = `SELECT * 
        FROM product 
        NATURAL JOIN image 
        NATURAL JOIN options 
        WHERE product_no = ?`;
  var [rows] = await conn.query(sql, product_no);
  const product = rows[0];

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
