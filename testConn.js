// testConn.js
/*const pool = require('./db');

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('資料庫連線成功！');
  } catch (err) {
    console.error('資料庫連線失敗：', err);
  } finally {
    if (conn) conn.release(); // 釋放連線回到連線池
  }
}

testConnection();
*/
// testConn.js
const { sequelize } = require('./orm');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ 成功連接到資料庫');
  } catch (error) {
    console.error('❌ 無法連接資料庫：', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
