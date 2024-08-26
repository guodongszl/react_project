'use client';
import { Dropdown, Menu, Button, Card, Space, Divider, Tag, Layout } from 'antd';
import {
	MoreOutlined,
	EditOutlined,
	DeleteOutlined,
	UserOutlined,
	MessageOutlined,
	EyeOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import BlogPostViewer from './BlogPostViewer';
import { marked } from 'marked';
import ReactDOMServer from 'react-dom/server';
const { Header, Footer, Sider, Content } = Layout;

export default function Home({ tags, author_id }) {
	const [blogs, setBlogs] = useState([]);
	const [blogsDom, setBlogsDom] = useState([]);
	const { globalState, setGlobalVar } = useGlobalContext();
	const router = useRouter();

	function extractTextSummary(htmlString) {
		// 创建一个临时的DOM元素来解析HTML
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlString;

		// 使用DOM方法提取文本
		const textContent = tempDiv.textContent || tempDiv.innerText;

		// 截取前128个字符作为摘要
		const summary = textContent.trim().substring(0, 128);

		// 处理连续的空格，并在摘要末尾添加省略号
		return summary.replace(/\s+/g, ' ').trim() + (summary.length >= 128 ? '...' : '');
	}

	useEffect(() => {
		if (blogs.length > 0) {
			const tempBlogsDom = blogs.map((blog) => {
				// 解析 HTML 字符串为 DOM
				var parser = new DOMParser();
				var doc = parser.parseFromString(blog.content, 'text/html');

				// 使用 querySelector 获取第一个 <img> 元素
				var firstImage = doc.querySelector('img');
				if (firstImage) {
					firstImage.style.height = '100%';
					firstImage.style.width = '100%';
					firstImage.style.objectFit = 'cover';
				}

				return (
					<Layout key={blog.id}>
						<Content style={{ backgroundColor: 'white' }}>
							<Link
								style={{ textDecoration: 'none' }}
								href={`/blog/${blog.id}`}
								key={blog.id}
							>
								<div style={{ color: 'black' }}>
									<h2>{blog.title}</h2>
									<p
										style={{
											overflow: 'hidden', // 内容超出元素盒子时隐藏
											textOverflow: 'ellipsis', // 显示省略号
											whiteSpace: 'nowrap', // 不换行
											width: '100%', // 宽度设为100%或根据需要设置
										}}
									>
										{extractTextSummary(marked(blog.content))}
									</p>
									<Space size={'middle'}>
										<span>
											<Link href={`/personalHomePage/${blog.author_id}`}>
												<UserOutlined style={{ marginRight: 5 }} />
												作者：{blog.author}
											</Link>
										</span>
										<span>
											<MessageOutlined style={{ marginRight: 5 }} />
											评论数：{blog.comment_count}
										</span>
										<span>
											<EyeOutlined style={{ marginRight: 5 }} />
											阅读量：{blog.read_count}
										</span>
										{blog.tags?.map((tag) => {
											return <Tag key={tag}>{tag}</Tag>;
										})}
										{/* <Tag>{blog.tags}</Tag> */}
										<span>
											{blog.author == globalState.username ? (
												<Dropdown
													menu={{ items: menu(blog) }}
													trigger={['hover']}
												>
													<Button
														type="text"
														icon={<EllipsisOutlined />}
														onClick={(e) => e.preventDefault()}
													/>
												</Dropdown>
											) : (
												<></>
											)}
										</span>
									</Space>
								</div>
							</Link>
						</Content>
						<Sider style={{ backgroundColor: 'white' }}>
							<div
								style={{ float: 'right', height: '135px' }}
								dangerouslySetInnerHTML={{ __html: firstImage?.outerHTML }}
							/>
						</Sider>
					</Layout>
				);
			});
			setBlogsDom(tempBlogsDom);
		}
	}, [blogs]); // 依赖数组中包含 blogs，确保在 blogs 更新后运行

	useEffect(() => {
		getData();
	}, []); // 空依赖数组，仅在组件挂载时运行

	var getData = async () => {
		var res = await fetch(`/api/blog?tags=${tags}&author_id=${author_id}`);
		var data = await res.json();
		setBlogs(data);
	};
	var handleDelete = async (id) => {
		var res = await fetch(`/api/blog?id=${id}`, {
			method: 'DELETE',
		});
		getData();
	};
	const menu = (blog) => [
		{
			key: 'edit',
			icon: <EditOutlined />,
			label: '编辑',
			onClick: ({ domEvent }) => {
				domEvent.preventDefault();
				if (blog.build_type == 'RT') {
					router.push(`/richTextEditor?id=${blog.id}`);
				} else if (blog.build_type == 'MD') {
					router.push(`/markdownEditor?id=${blog.id}`);
				}
			},
		},
		{
			key: 'delete',
			icon: <DeleteOutlined />,
			label: '删除',
			onClick: ({ domEvent }) => {
				domEvent.preventDefault();
				handleDelete(blog.id);
			},
			style: { color: 'red' },
		},
	];
	return (
		<div>
			<Space
				direction="vertical"
				size={0}
				style={{
					display: 'flex',
				}}
				split={<Divider />}
			>
				{blogsDom}
			</Space>
		</div>
	);
}
