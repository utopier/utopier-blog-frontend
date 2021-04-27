import TagCard from '../TagCard';
import styled from '@emotion/styled';

const TagListWarpper = styled.ul`
	display: grid;
	grid-auto-rows: 60px;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 20px;
	margin: 20px 50px;
	@media (max-width: 1000px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (max-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 750px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 430px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const TagList = ({ tagData }: any) => {
	return (
		<>
			<TagListWarpper>
				{tagData.map((tag: any) => (
					<TagCard tagData={tag} key={tag.id} />
				))}
			</TagListWarpper>
		</>
	);
};

export default TagList;
