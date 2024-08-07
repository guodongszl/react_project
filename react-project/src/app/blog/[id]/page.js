// app/blog/[slug]/page.js
'use client'
import { useState, useEffect } from 'react';
import { Button, Card } from 'antd';

export default function Page ({ params }) {
    const [blog, setBlog] = useState([])

    useEffect(() => {
        fetch(`/api/blog?id=${params.id}`)
            .then(res => res.json())
            .then(data => setBlog(data[0][0]))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []); // 空依赖数组，仅在组件挂载时运行

    return (
        <div>
            <Card title={blog.title}>
                {blog.content}
            </Card>

        </div>
    )
}