'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalContext';

export default function Login() {
	const router = useRouter();
	const { globalState, setGlobalVar } = useGlobalContext();
	var onFinish = async (values) => {
		var res = await fetch('api/user/login', {
			method: 'POST',
			body: JSON.stringify(values),
		});
		var json = await res.json();

		if (json.length != 0) {
			setGlobalVar('id', json[0].id);
			setGlobalVar('username', json[0].username);
			router.push('/home');
		}
	};
	var onFinishFailed = () => {};
	return (
		<div>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="用户名"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						登录
					</Button>
					<Button type="link">
						<Link href="/register">前往注册</Link>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

function MyButton() {
	return (
		<Button type="primary">
			<Link href="/home">home</Link>
		</Button>
	);
}
