'use client'
import { Tabs } from 'antd';
import Blogs from '@/components/Blogs'

export default function Home () {
    const items = [
        {
            key: '1',
            label: '生活',
            children: (
                <Blogs tags={'生活'} />
            )
        },
        {
            key: '2',
            label: 'Next',
            children: (
                <Blogs tags={'Next'} />
            )
        },
    ]
    return (
        <>

            <Tabs defaultActiveKey="1" items={items} />
        </>
    )
}

