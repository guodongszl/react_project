// components/Comments.js
'use client';
import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useGlobalContext } from '@/context/GlobalContext';
const { TextArea } = Input;

const Comments = ({ blogId }) => {
	const [comments, setComments] = useState([]);
	const [form] = Form.useForm();
	const { globalState, setGlobalVar } = useGlobalContext();

	useEffect(() => {
		fetchComments();
	}, [blogId]);

	const fetchComments = async () => {
		const res = await fetch(`/api/comments?id=${blogId}`);
		const data = await res.json();
		setComments(data);
	};

	const handleSubmit = async (values) => {
		var data = { ...values, author: globalState.username, id: blogId };
		const res = await fetch(`/api/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		fetchComments();
		form.resetFields();
	};

	return (
		<div>
			<h2>评论</h2>
			<Form form={form} onFinish={handleSubmit}>
				<Form.Item
					name="content"
					rules={[{ required: true, message: 'Please enter your comment' }]}
				>
					<TextArea rows={4} placeholder="请评论" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						评论
					</Button>
				</Form.Item>
			</Form>
			{comments.map((comment) => (
				<div key={comment.id}>
					<p>
						<b>{comment.author}:</b> {comment.content}
					</p>
				</div>
			))}
		</div>
	);
};

export default Comments;
