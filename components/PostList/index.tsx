import PostCard from '../PostCard';
import styled from '@emotion/styled';

const PostListWrapper = styled.ul`
	padding-top: 10px;
	display: grid;
	grid-template-rows: repeat(2, 530px);
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	@media (max-width: 1300px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 750px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const PostList = ({ postData }: any) => {
	return (
		<PostListWrapper className="post-list-wrapper">
			{postData && postData.map((post: any) => (
				<PostCard postData={post} key={post.id} />
			))}
		</PostListWrapper>
	);
};

export default PostList;
