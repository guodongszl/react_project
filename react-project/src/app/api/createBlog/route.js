import pool from '../db.js'; // 引入数据库连接模块

export async function POST(request, response) {
	const body = await request.json();
	try {
		const { title, content, author, author_id, tags, build_type } = body;
		console.log('tags', tags);

		// 编写 SQL 查询语句
		const sql =
			'INSERT INTO blog(title,content,author,author_id,tags,build_type,read_count ) VALUES( ?, ?, ?, ?, ?, ?,0)';

		// 执行查询并获取结果
		const results = await pool.query(sql, [
			title,
			content,
			author,
			author_id,
			JSON.stringify(tags),
			build_type,
		]);

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
