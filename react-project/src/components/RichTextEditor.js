'use client';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input, Row, Col, Form, Button, Upload } from 'antd';
import { marked } from 'marked';

const RichTextEditor = ({ form, onFinish }) => {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        },
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'size', 'header',
        'color', 'background',
        'align', 'indent',
        'list', 'bullet',
        'link', 'blockquote',
        'code', 'code-block',
        'script',
        'image', 'video',
        'formula',
        'clean'
    ];

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // 初始化时从 form 中获取 content 值
        var content = form.getFieldValue('content')
        const markdownRegex = /(^#+\s)|(\*\*.*\*\*)|(__.*__)|(\*.*\*)|(_.*_)|(\[.*\]\(.*\))|(!\[.*\]\(.*\))|(^-|\+|\*)|(^\d+\.)|(^```)|(^~~~)|(^>)/m;
        if (content) {
            if (markdownRegex.test(content)) {
                form.setFieldsValue({ content: marked(content) })
            }
            setValue(content);
        }
    }, [form.getFieldValue('content'), form]);

    return (
        <div>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="标题" name="title" rules={[
                    {
                        required: true,
                        message: '请输入标题',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content">
                    <ReactQuill
                        style={{ height: '518px', marginBottom: '42px' }}
                        theme="snow"
                        value={value}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                    />
                </Form.Item>
                <Form.Item label="标签" name="tags">
                    <Input></Input>
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