'use client';
import { useEffect, useState } from 'react';
import { Col, Row, Statistic, Card, Button, message, Skeleton } from 'antd';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';

const PersonalInfoCard = ({ author_id }) => {
	var [data, setData] = useState();
	var [dataDom, setDataDom] = useState(
		<Skeleton
			paragraph={{
				rows: 2,
			}}
		></Skeleton>,
	);
	const { globalState, setGlobalVar } = useGlobalContext();
	var [followerData, setFollowerData] = useState();
	const [messageApi, contextHolder] = message.useMessage();

	var getData = async () => {
		if (author_id) {
			var res = await fetch(`/api/user?id=${author_id}`);
			var [json] = await res.json();
			setData(json);
			var res1 = await fetch(`/api/follower?follower_id=${author_id}`);
			var [json1] = await res1.json();

			var res2 = await fetch(`/api/follower?followee_id=${author_id}`);
			var [json2] = await res2.json();

			var res3 = await fetch(
				`/api/follower?follower_id=${globalState.id}&followee_id=${author_id}`,
			);
			var [json3] = await res3.json();

			var res4 = await fetch(`/api/comments?author_id=${author_id}`);
			var [json4] = await res4.json();

			var res5 = await fetch(`/api/blog/readCount?id=${author_id}`);
			var [json5] = await res5.json();

			setFollowerData({
				follower_count: json1.count,
				followee_count: json2.count,
				is_followed: json3.count,
				comment_count: json4.comment_count,
				total_read_count: json5.total_read_count,
			});
		}
	};

	useEffect(() => {
		getData();
	}, [author_id]);

	useEffect(() => {
		if (data && followerData) {
			var dom = (
				<Link style={{ textDecoration: 'none' }} href={`/personalHomePage/${author_id}`}>
					<Card
						style={{ marginBottom: '10px' }}
						size="small"
						extra={
							globalState.id != data.id ? (
								followerData.is_followed ? (
									<Button
										type="link"
										onClick={async (e) => {
											e.preventDefault();
											var res = await fetch('/api/follower', {
												method: 'DELETE',
												body: JSON.stringify({
													follower_id: globalState.id,
													followee_id: data.id,
												}),
											});

											getData();
										}}
									>
										取消关注
									</Button>
								) : (
									<Button
										type="link"
										onClick={async (e) => {
											e.preventDefault();
											var res = await fetch('/api/follower', {
												method: 'POST',
												body: JSON.stringify({
													follower_id: globalState.id,
													followee_id: data.id,
												}),
											});

											getData();
										}}
									>
										关注
									</Button>
								)
							) : (
								<></>
							)
						}
					>
						<Row gutter={16}>
							<Col span={2}>
								<Statistic title="用户名" value={data.username} />
							</Col>
							<Col span={2}>
								<Statistic title="博客数" value={data.blog_count} />
							</Col>
							<Col span={2}>
								<Statistic title="评论数" value={followerData.comment_count} />
							</Col>
							<Col span={2}>
								<Statistic title="阅读量" value={followerData.total_read_count} />
							</Col>
							<Col span={2}>
								<Link href={`/followee?id=${author_id}`}>
									<Statistic title="关注数" value={followerData.follower_count} />
								</Link>
							</Col>
							<Col span={2}>
								<Link href={`/follower?id=${author_id}`}>
									<Statistic title="粉丝数" value={followerData.followee_count} />
								</Link>
							</Col>
						</Row>
                        
					</Card>
				</Link>
			);
			setDataDom(dom);
		}
	}, [data, followerData]);

	return (
		<div>
			{contextHolder}
			{dataDom}
		</div>
	);
};
export default PersonalInfoCard;
