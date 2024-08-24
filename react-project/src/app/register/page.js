'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function Register() {
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			const res = await fetch('/api/user/register', {
				// 注意斜杠的正确使用
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (res.ok) {
				// 请求成功，提示注册成功并导航到首页
				message.success('注册成功!');
				router.push('/'); // 导航到首页，根据你的应用结构，这可能是 '/home' 或其他路由
			} else {
				// 请求失败，从响应中获取错误信息并提示
				const errorData = await res.json();
				message.error(errorData.message || '注册失败，请重试。');
			}
		} catch (error) {
			// 网络或其他错误，提示用户
			console.error('注册错误:', error);
			message.error('注册过程中出现错误，请重试。');
		}
	};

	return (
		<div>
			<Form
				form={form}
				name="register"
				onFinish={onFinish}
				scrollToFirstError
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name="username"
					label="用户名"
					rules={[
						{
							required: true,
							message: '请输入您的用户名!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label="密码"
					rules={[
						{
							required: true,
							message: '请输入您的密码!',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="确认密码"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: '请确认您的密码!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('两次输入的密码不匹配!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
					<Button type="link">
						<Link href="/">已有账号? 去登录</Link>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
