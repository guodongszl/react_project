// // app/api/blog/route.js
// import pool from '../db.js'; // 引入数据库连接模块


// export async function GET (request) {
//     const { id } = request.query;
//     const sql = 'SELECT * FROM blog WHERE id = ?';
//     const results = await pool.query(sql, [id]);

//     if (results.length === 0) {
//         return new Response('Blog not found', { status: 404 });
//     }

//     return new Response(JSON.stringify(results[0]), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//     });
// }


// app/api/blog/route.js
import pool from '../db.js'; // 引入数据库连接模块

export async function GET(req,res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // 编写 SQL 查询语句
    const sql = 'SELECT * FROM blog WHERE id = ?';

    // 执行查询并获取结果
    const results = await pool.query(sql,id);

    // 返回 JSON 响应
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    });
  } catch (error) {
    // 错误处理
    console.error('Database error:', error);
    return new Response('Internal Server Error', {
      status: 500
    });
  }
}



// export function GET (req, res) {

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     console.log(id);
//     return new Response('Blog not found', { status: 200 });
// }