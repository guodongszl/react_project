import pool from '../db.js'; // 引入数据库连接模块

export async function POST(request, response) {
	const body = await request.json();
	try {
		const { title, content, tags, id } = body;

		// 编写 SQL 查询语句
		const sql = 'update blog set title = ?,content = ?,tags = ? where id= ?';

		// 执行查询并获取结果
		const results = await pool.query(sql, [title, content, JSON.stringify(tags), id]);

		// 返回 JSON 响应
		return new Response(JSON.stringify(results), {
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
