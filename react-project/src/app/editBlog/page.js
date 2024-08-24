// pages/blog/[id].js
'use client';
import { Tabs } from 'antd';
import MarkdownEditor from '@/app/markdownEditor/page.js'
import RichTextEditor from '@/app/richTextEditor/page.js'

export default function Blog () {
    const items = [
        {
            key: '1',
            label: '富文本编辑器',
            children: (
                <RichTextEditor />
            )
        },
        {
            key: '2',
            label: 'Markdown 编辑器',
            children: (
                <MarkdownEditor />
            )
        },
    ]

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}