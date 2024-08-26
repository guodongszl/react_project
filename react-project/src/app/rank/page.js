'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Statistic } from 'antd';
import PersonalInfoCard from '@/components/PersonalInfoCard';
const Rank = () => {
	const [data, setData] = useState([]);
	const [dataDom, setDataDom] = useState();

	const getData = async () => {
		var res = await fetch('/api/follower?list=rank');
		var json = await res.json();
		setData(json);
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(data.length);

		if (data.length > 0) {
			console.log(data);
			var dom = data.map((user) => {
				console.log();

				return <PersonalInfoCard author_id={user.id} key={user.id}/>;
			});
			setDataDom(dom);
		}
	}, [data]);

	return (
		<>
			<h1>排行榜</h1>
			{dataDom}
		</>
	);
};
export default Rank;
