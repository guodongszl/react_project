// components/EditorTabs.js
'use client';
import { Tabs, Button } from 'antd';
import MarkdownEditor from './MarkdownEditor';
import BasicEditor from './BasicEditor';
import RichTextEditor from './RichTextEditor';
import Link from 'next/link';

const EditorTabs = ({ form1, form2, onFinish }) => {

    const items = [
        // {
        //     key: '1',
        //     label: '基础编辑器',
        //     children: (
        //         <BasicEditor form={form} onFinish={onFinish} />
        //     )
        // },
        {
            key: '1',
            label: '富文本编辑器',
            children: (
                <RichTextEditor form={form1} onFinish={onFinish} />
            )
        },
        {
            key: '2',
            label: 'Markdown 编辑器',
            children: (
                <MarkdownEditor form={form2} onFinish={onFinish} />
            )
        },


    ];
    var flag = 1

    return (
        <div>

            <Tabs defaultActiveKey="1" items={items} />

        </div>
    );
};

export default EditorTabs;