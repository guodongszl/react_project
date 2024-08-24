
import pool from '@/app/api/db.js'; // 引入数据库连接模块

export async function GET (req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        // 构建 SQL 查询语句和参数数组
        let sql = 'SELECT *,(SELECT COUNT(*) FROM blog WHERE blog.author_id = user.id) AS blog_count FROM user';
        let params = [];

        if (id && id != 'undefined') {
            if (params.length > 0) {
                sql += ' AND id = ?';
            } else {
                sql += ' WHERE id = ?';
            }
            params.push(id);
        }
        console.log(sql);

        // 执行查询并获取结果
        const [results] = await pool.query(sql, params);

        // 返回 JSON 响应
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // 错误处理
        console.error('Database error:', error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}