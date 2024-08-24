// components/NavBar.js
'use client';
import { Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, EditOutlined, LogoutOutlined, TrophyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext';

const NavBar = () => {
    const pathname = usePathname();
    const { globalState, setGlobalVar } = useGlobalContext();

    const items = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link href="/home">首页</Link>,
        },
        {
            key: 'editBlog',
            icon: <EditOutlined />,
            label: <Link href="/editBlog">写博客</Link>,
        },
        {
            key: 'myBlogs',
            icon: <ContactsOutlined />,
            label: <Link href={`/personalHomePage/${globalState?.id}`}>我的博客</Link>,
        },
        {
            key: 'rank',
            icon: <TrophyOutlined />,
            label: <Link href='/rank' > 排行榜</Link >,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: <Link href="/" style={{ float: 'right' }}>登出</Link>,
        },
    ];

    // 根据当前路径设置选中的菜单项
    const selectedKeys = items.filter(item => pathname === item.label.props.href).map(item => item.key);

    return (
        <Menu mode="horizontal" items={items} selectedKeys={selectedKeys} style={{ display: 'flex', justifyContent: 'center' }} />
    );
};

export default NavBar;