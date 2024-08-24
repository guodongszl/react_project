'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react'
import { Dropdown, Menu, Button, Card } from 'antd';
import Link from 'next/link';

const Followee = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState([])
    const [dataDom, setDataDom] = useState()
    const hasFetched = useRef(false);

    const getData = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        var res = await fetch(`/api/follower?list=follower&followee_id=${id}`)
        var json = await res.json()
        json.forEach(async (user) => {
            var res1 = await fetch(`/api/user?id=${user.follower_id}`)
            var [json1] = await res1.json()
            setData((oldValue) => {
                return [...oldValue, json1]
            })
        })
    }

    useEffect(() => {
        getData();
    }, [id])

    useEffect(() => {
        var dom = data.map((user) => {
            return (
                <Link href={`/personalHomePage/${user.id}`}>
                    <Card title={user.username}>
                        {user.password}
                    </Card>
                </Link>
            )
        })
        setDataDom(dom)
    }, [data])

    return (
        <>
            <h1>粉丝列表</h1>
            {dataDom}
        </>
    )
}
export default Followee