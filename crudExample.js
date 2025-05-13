// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  const studentID = 'S10810001';
  const newDepartment = 'EE001'; // ✅ 確保這個系別在 DEPARTMENT 表中存在

  try {
    conn = await pool.getConnection();

    // 1. 檢查該學號是否存在
    let checkSql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    let existing = await conn.query(checkSql, [studentID]);

    if (existing.length > 0) {
      console.log(`學號 ${studentID} 已存在，開始執行操作...`);
    } else {
      console.log(`學號 ${studentID} 不存在，新增學生...`);

      // INSERT 新增
      let insertSql = 'INSERT INTO STUDENT (Student_ID, Name, Gender, Email, Department_ID) VALUES (?, ?, ?, ?, ?)';
      await conn.query(insertSql, [studentID, '王曉明', 'M', 'wang@example.com', 'CS001']);
      console.log('✅ 已新增一筆學生資料');
    }

    // 2. SELECT 查詢 CS001 系的所有學生
    let sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    const rows = await conn.query(sql, ['CS001']);
    console.log('📄 查詢 CS001 系學生結果：', rows);

    // 3. UPDATE 系別
    sql = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(sql, [newDepartment, studentID]);
    console.log(`✏️ 已將學生系別更新為 ${newDepartment}`);

    // 4. 查詢該學生目前所屬系所名稱
    sql = `
      SELECT S.Student_ID, S.Name, S.Department_ID, D.Name AS Department_Name
      FROM STUDENT S
      JOIN DEPARTMENT D ON S.Department_ID = D.Department_ID
      WHERE S.Student_ID = ?
    `;
    const info = await conn.query(sql, [studentID]);
    const student = info[0];
    console.log(`🔍 學生 ${student.Student_ID} - ${student.Name} 目前系別是：${student.Department_Name} (${student.Department_ID})`);

  } catch (err) {
    console.error('❌ 操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

basicCrud();
