const pool = require('./db');

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM STUDENT LIMIT 5");
    console.log('查詢結果：', rows);
  } catch (err) {
    console.error('資料庫連線失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

testConnection();
