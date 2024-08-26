'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Dropdown, Menu, Button, Card } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const Follower = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const [data, setData] = useState([]);
	const [dataDom, setDataDom] = useState();
	const hasFetched = useRef(false);

	const getData = async () => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		var res = await fetch(`/api/follower?list=followee&follower_id=${id}`);
		var json = await res.json();
		json.forEach(async (user) => {
			var res1 = await fetch(`/api/user?id=${user.followee_id}`);
			var [json1] = await res1.json();
			setData((oldValue) => {
				return [...oldValue, json1];
			});
		});
	};

	useEffect(() => {
		getData();
	}, [id]);

	useEffect(() => {
		var dom = data.map((user) => {
			return (
				<Link href={`/personalHomePage/${user.id}`} key={user.id}>
					<Card title={user.username}>{user.password}</Card>
				</Link>
			);
		});
		setDataDom(dom);
	}, [data]);

	return (
		<>
			<h1>关注列表</h1>
			{dataDom}
		</>
	);
};

export function Searchbar() {
	return (
		// You could have a loading skeleton as the `fallback` too
		<Suspense>
			<Follower />
		</Suspense>
	);
}

export default Follower;
