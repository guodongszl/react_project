'use client'
import { Button, Card } from 'antd';
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Home () {
    const [blogs, setBlogs] = useState([])
    const [blogsDom, setBlogsDom] = useState([])

    useEffect(() => {
        if (blogs.length > 0) {
            const tempBlogsDom = blogs.map(blog =>
                <Link href={`/blog/${blog.id}`} key={blog.id}>
                    <Card title={blog.title}>
                        {blog.content}
                    </Card>
                </Link>
            );
            
            setBlogsDom(tempBlogsDom);
        }
    }, [blogs]); // 依赖数组中包含 blogs，确保在 blogs 更新后运行

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data[0]))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []); // 空依赖数组，仅在组件挂载时运行

    return (
        <div>
            <Button type='primary' >
                <Link href="/editBlog">写博客</Link>
            </Button>
            {blogsDom}
        </div>
    )
}