import pool from '../../db.js'; // 引入数据库连接模块

export async function POST(req, res) {
	const body = await req.json(); // 修正了错误，应该是 req.json() 而不是 res.json()
	try {
		const { username, password } = body;

		// 检查用户名是否已存在
		const userCheckSql = 'SELECT * FROM user WHERE username = ?';
		const [userExists] = await pool.query(userCheckSql, [username]);

		if (userExists.length > 0) {
			// 如果用户名已存在，返回错误信息
			return new Response(JSON.stringify({ message: '用户名已存在，请选择其他用户名。' }), {
				status: 400, // 使用 400 状态码表示客户端错误
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// 如果用户名不存在，继续插入新用户
		const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
		const results = await pool.query(sql, [username, password]);

		// 返回 JSON 响应
		return new Response(JSON.stringify({ message: '注册成功' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		// 错误处理
		console.error('Database error:', error);
		return new Response('Internal Server Error', {
			status: 500,
		});
	}
}
