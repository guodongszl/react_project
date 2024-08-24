import pool from '@/app/api/db'; // 引入数据库连接模块
export async function POST(req, res) {
	const { blogId } = await req.json();

	try {
		// 更新博客的阅读量
		const [result] = await pool.query(
			'UPDATE blog SET read_count = read_count + 1 WHERE id = ?',
			[blogId],
		);

		// 获取更新后的阅读量
		const [rows] = await pool.query('SELECT read_count FROM blog WHERE id = ?', [blogId]);

		const readCount = rows[0].read_count;

		return new Response(JSON.stringify({ readCount }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	var sql = `SELECT 
                    u.id,
                    u.username,
                    COALESCE(SUM(b.read_count), 0) AS total_read_count
                FROM 
                    user u
                JOIN 
                    blog b ON u.id = b.author_id
                WHERE 
                    u.id = ?`;
	const [result] = await pool.query(sql, [id]);
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}
