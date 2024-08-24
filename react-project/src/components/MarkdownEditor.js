// components/MarkdownEditor.js
'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input, Row, Col, Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import showdown from 'showdown';

const { TextArea } = Input;


const MarkdownEditor = ({ form, onFinish }) => {
    const [markdown, setMarkdown] = useState('');
    const converter = new showdown.Converter();

    useEffect(() => {
        // 初始化时从 form 中获取 content 值
        var content = form.getFieldValue('content');
        const htmlTagRegex = /<[^>]*>/;

        if (content) {
            if (htmlTagRegex.test(content)) {
                form.setFieldsValue({ content: converter.makeMarkdown(content) })
            }
            setMarkdown(content);
        }
    }, [form.getFieldValue('content'), form]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        const imageUrl = data.url;
        setMarkdown((prevMarkdown) => `${prevMarkdown}![image](${imageUrl})`);
        return false; // 阻止自动上传
    };

    return (
        <>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="标题" name="title" rules={[
                    {
                        required: true,
                        message: '请输入标题',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="content">
                            <TextArea
                                rows={25}
                                placeholder="请输入"
                                value={markdown}
                                onChange={(e) => {
                                    setMarkdown(e.target.value);
                                }}
                            />
                        </Form.Item>
                        {/* <Form.Item>
                        <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>上传图片</Button>
                        </Upload>
                    </Form.Item> */}
                    </Col>
                    <Col span={12}>
                        <div style={{ border: '1px solid #d9d9d9', padding: '16px', minHeight: '90%' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                        </div>
                    </Col>
                </Row>
                <Form.Item label="标签" name="tags">
                    <Input></Input>
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