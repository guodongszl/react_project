'use client';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input, Row, Col, Form, Button, Upload, Select } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext';

const RichTextEditor = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const id = searchParams.get('id');
	const [value, setValue] = useState('');
	const [form] = Form.useForm();
	const { globalState, setGlobalVar } = useGlobalContext();
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ color: [] }, { background: [] }],
			[{ script: 'sub' }, { script: 'super' }],
			[{ align: [] }],
			['blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],
			['link', 'image', 'video'],
			['clean'],
		],
		history: {
			delay: 2000,
			maxStack: 500,
			userOnly: true,
		},
	};

	const formats = [
		'bold',
		'italic',
		'underline',
		'strike',
		'size',
		'header',
		'color',
		'background',
		'align',
		'indent',
		'list',
		'bullet',
		'link',
		'blockquote',
		'code',
		'code-block',
		'script',
		'image',
		'video',
		'formula',
		'clean',
	];

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
				build_type: 'RT',
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
					setValue(data[0].content);
				})
				.catch((error) => console.error('Error fetching blogs:', error));
		}
	}, [id]);

	return (
		<div>
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
				<Form.Item
					name="content"
					rules={[
						{
							required: true,
							message: '请输入',
						},
					]}
				>
					<ReactQuill
						style={{ height: '518px', marginBottom: '42px' }}
						theme="snow"
						value={value}
						onChange={setValue}
						modules={modules}
						formats={formats}
					/>
				</Form.Item>
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
		</div>
	);
};

export default RichTextEditor;
