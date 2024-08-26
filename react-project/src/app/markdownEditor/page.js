// components/MarkdownEditor.js
'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input, Row, Col, Form, Button, Select } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
const { TextArea } = Input;
import { useGlobalContext } from '@/context/GlobalContext';

const MarkdownEditor = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const id = searchParams.get('id');
	const [form] = Form.useForm();
	const [markdown, setMarkdown] = useState('');
	const { globalState, setGlobalVar } = useGlobalContext();

	const options = [
		{
			value: '生活',
			label: <span>生活</span>,
		},
		{
			value: 'Next',
			label: <span>Next</span>,
		},
	];

	const onFinish = async (values) => {
		if (id) {
			const data = { ...values, id: id };
			const res = await fetch('/api/updateBlog', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (res.ok) {
				router.back();
			}
		} else {
			const data = {
				...values,
				build_type: 'MD',
				author: globalState.username,
				author_id: globalState.id,
			};
			const res = await fetch('/api/createBlog', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (res.ok) {
				router.back();
			}
		}
	};

	useEffect(() => {
		if (id) {
			fetch(`/api/blog?id=${id}`)
				.then((res) => res.json())
				.then((data) => {
					form.setFieldsValue(data[0]);
					setMarkdown(data[0].content);
				})
				.catch((error) => console.error('Error fetching blogs:', error));
		}
	}, [id]);

	return (
		<>
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					label="标题"
					name="title"
					rules={[
						{
							required: true,
							message: '请输入标题',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="content"
							rules={[
								{
									required: true,
									message: '请输入',
								},
							]}
						>
							<TextArea
								rows={25}
								placeholder="请输入"
								value={markdown}
								onChange={(e) => {
									setMarkdown(e.target.value);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<div
							style={{
								border: '1px solid #d9d9d9',
								padding: '16px',
								minHeight: '90%',
							}}
						>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
						</div>
					</Col>
				</Row>
				<Form.Item
					label="标签"
					name="tags"
					rules={[
						{
							required: true,
							message: '请选择标签',
						},
					]}
				>
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder="请选择一个选项"
						options={options}
						showSearch
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						发布
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default MarkdownEditor;
