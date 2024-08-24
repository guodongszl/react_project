// components/BasicEditor.js
'use client';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

const BasicEditor = ({ form, onFinish }) => {
    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item label="标题" name="title" rules={[
                {
                    required: true,
                    message: '请输入标题',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="内容" name="content" rules={[
                {
                    required: true,
                    message: '请输入内容',
                },
            ]}>
                <TextArea rows={25} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    发布
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BasicEditor;