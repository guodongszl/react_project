// app/blog/[slug]/page.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'antd';
import Comments from '@/components/Comments.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactQuill from 'react-quill';
import './style.css';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'js-cookie';
import { useGlobalContext } from '@/context/GlobalContext';
import PersonalInfoCard from '@/components/PersonalInfoCard';

export default function Page({ params }) {
	const { id } = params;
	const hasFetched = useRef(false);
	const [blog, setBlog] = useState([]);
	const { globalState, setGlobalVar } = useGlobalContext();

	const increaseReadCount = () => {
		const blogViewed = Cookies.get(`blog_viewed_${id}_${globalState.id}`);

		if (!blogViewed) {
			if (hasFetched.current) return;
			hasFetched.current = true;
			fetch(`/api/blog/readCount`, {
				method: 'POST',
				body: JSON.stringify({ blogId: id }),
			}).then((data) => {
				// 设置 Cookie，24 小时后过期
				Cookies.set(`blog_viewed_${id}_${globalState.id}`, 'true', { expires: 1 });
			});
		}
	};

	const getData = () => {
		fetch(`/api/blog?id=${id}`)
			.then((res) => res.json())
			.then((data) => setBlog(data[0]))
			.catch((error) => console.error('Error fetching blogs:', error));
	};
	useEffect(() => {
		getData();
		increaseReadCount();
	}, []); // 空依赖数组，仅在组件挂载时运行

	const modules = {
		toolbar: false, // 设置为 false 以移除工具栏
	};

	return (
		<div>
			<PersonalInfoCard author_id={blog.author_id} />
			<Card title={blog.title}>
				{blog.build_type == 'RT' ? (
					<ReactQuill
						theme="snow"
						value={blog.content}
						readOnly={true}
						modules={modules}
						className="myEditor"
					/>
				) : (
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
				)}
			</Card>
			<Comments blogId={id} />
		</div>
	);
}
