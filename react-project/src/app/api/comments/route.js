// app/api/comments/[id]/route.js
import pool from '@/app/api/db.js';

export async function GET (req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const author_id = searchParams.get("author_id");
        // var id = 1
        // var author_id = 1



        if (author_id) {
            var sql = `SELECT 
                        b.author_id, 
                        COUNT(*) as comment_count
                    FROM 
                        blog b
                    JOIN 
                        comments c ON b.id = c.blog_id
                    WHERE 
                        b.author_id = ?`
            const [result] = await pool.query(sql, [author_id]);
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });

        } else {
            var a = 1
            const [result] = await pool.query('SELECT * FROM comments WHERE blog_id = ?', [id]);
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });


        }



    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST (request) {
    const { author, content, id } = await request.json();
    try {
        const [result] = await pool.query(
            'INSERT INTO comments (blog_id, author, content) VALUES (?, ?, ?)',
            [id, author, content]
        );
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
        return new Response(JSON.stringify(rows[0]), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}