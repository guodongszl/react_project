import pool from '@/app/api/db.js'; // 引入数据库连接模块

export async function GET() {
	var a;
	var b = ((2)[a] = [1]);
	return new Response(JSON.stringify(a), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}
