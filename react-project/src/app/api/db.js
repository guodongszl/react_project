// db.js
import mysql from 'mysql2/promise';

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'react_project',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0
});

export async function query(sql, values = []) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}

export default pool;