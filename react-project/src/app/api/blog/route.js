import pool from '../db.js'; // 引入数据库连接模块

export async function GET(req, res) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');
		const author_id = searchParams.get('author_id');
		const tags = searchParams.get('tags');
		// 构建 SQL 查询语句和参数数组
		let sql =
			'SELECT *, (SELECT COUNT(*) FROM comments WHERE comments.blog_id = blog.id) AS comment_count FROM blog';
		let params = [];

		if (id && id != 'undefined') {
			sql += ' WHERE id = ?';
			params.push(id);
		}

		if (author_id && author_id != 'undefined') {
			if (params.length > 0) {
				sql += ' AND author_id = ?';
			} else {
				sql += ' WHERE author_id = ?';
			}
			params.push(author_id);
		}
		if (tags && tags != 'undefined') {
			if (params.length > 0) {
				sql += ' AND JSON_CONTAINS(tags, ?)';
			} else {
				sql += ' WHERE JSON_CONTAINS(tags, ?)';
			}
			params.push(JSON.stringify(tags));
		}

		// 执行查询并获取结果
		const [results] = await pool.query(sql, params);

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

export async function DELETE(req, res) {
	try {
		const { searchParams } = new URL(req.url);

		const id = searchParams.get('id');
		var sql = 'delete from blog where id = ?';
		const deleteCommentsSql = 'DELETE FROM comments WHERE blog_id = ?';
		const [results] = await pool.query(sql, id);
		await pool.query(deleteCommentsSql, id);
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
