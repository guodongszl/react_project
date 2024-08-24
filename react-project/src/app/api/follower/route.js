import pool from '@/app/api/db.js'; // 引入数据库连接模块

export async function GET (req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const follower_id = searchParams.get('follower_id');
        const followee_id = searchParams.get('followee_id');
        const list = searchParams.get('list');

        if (list === 'follower') {
            // 获取关注者列表
            let sql = 'SELECT follower_id FROM follower WHERE followee_id = ?';
            const [results] = await pool.query(sql, [followee_id]);
            return new Response(JSON.stringify(results), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else if (list === 'followee') {
            // 获取正在关注的人列表
            let sql = 'SELECT followee_id FROM follower WHERE follower_id = ?';
            const [results] = await pool.query(sql, [follower_id]);
            return new Response(JSON.stringify(results), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else if (list === 'rank') {
            let sql = `
                SELECT 
    u.id AS id, 
    u.username, 
    COALESCE(f.followee_count, 0) AS followee_count,
    COALESCE(b.blog_count, 0) AS blog_count,
    COALESCE(g.follower_count, 0) AS follower_count
FROM 
    user u
LEFT JOIN 
    (SELECT 
        followee_id, 
        COUNT(*) AS followee_count
     FROM 
        follower
     GROUP BY 
        followee_id) f ON u.id = f.followee_id
LEFT JOIN 
    (SELECT 
        author_id, 
        COUNT(*) AS blog_count
     FROM 
        blog
     GROUP BY 
        author_id) b ON u.id = b.author_id
LEFT JOIN 
    (SELECT 
        follower_id, 
        COUNT(*) AS follower_count
     FROM 
        follower
     GROUP BY 
        follower_id) g ON u.id = g.follower_id
ORDER BY 
    followee_count DESC;
        `;
            const [results] = await pool.query(sql);

            // 返回 JSON 响应
            return new Response(JSON.stringify(results), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // 构建 SQL 查询语句和参数数组
            let sql = 'SELECT COUNT(*) as count FROM follower';
            let params = [];

            if (follower_id && follower_id != 'undefined') {
                if (params.length > 0) {
                    sql += ' AND follower_id = ?';
                } else {
                    sql += ' WHERE follower_id = ?';
                }
                params.push(follower_id);
            }

            if (followee_id && followee_id != 'undefined') {
                if (params.length > 0) {
                    sql += ' AND followee_id = ?';
                } else {
                    sql += ' WHERE followee_id = ?';
                }
                params.push(followee_id);
            }

            // 执行查询并获取结果
            const [results] = await pool.query(sql, params);

            // 返回 JSON 响应
            return new Response(JSON.stringify(results), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        // 错误处理
        console.error('Database error:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}

export async function POST (req, res) {
    try {
        const { follower_id, followee_id } = await req.json();
        var sql = 'INSERT INTO follower (follower_id, followee_id) VALUES (?, ?)';
        const [results] = await pool.query(sql, [follower_id, followee_id]);
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}

export async function DELETE (req, res) {
    try {
        const { follower_id, followee_id } = await req.json();
        var sql = 'DELETE FROM follower WHERE follower_id = ? AND followee_id = ?';
        const [results] = await pool.query(sql, [follower_id, followee_id]);
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
