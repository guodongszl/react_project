'use client';
import Blogs from '@/components/Blogs';
import PersonalInfoCard from '@/components/PersonalInfoCard';
const PersonalHomePage = ({ params }) => {
	const { author_id } = params;

	return (
		<div>
			<PersonalInfoCard author_id={author_id} />
			<Blogs author_id={author_id}></Blogs>
		</div>
	);
};
export default PersonalHomePage;
