import styled from '@emotion/styled';
import CommentCard from '../CommentCard';

import Button from '../../components/Common/Button';

import useInput from '../../hooks/useInput';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../store/reducers/post';

const CommentListWrapper = styled.div`
	padding: 10px;
	.post__comments--title {
		padding-bottom: 10px;
	}
	.post__comments--create {
		display: flex;
		flex-direction: column;
		padding-bottom: 10px;
		textarea {
			height: 60px;
			width: 300px;
		}
		div {
			align-self: flex-end;
			width: 100px;
		}
	}
`;

const commentMock = [
	{
		id: 1,
		createDate: '2020년 10월 20일',
		content: 'test comment 입니다.',
	},
	{
		id: 2,
		createDate: '2020년 10월 22일',
		content: 'test comment 2 입니다.',
	},
	{
		id: 3,
		createDate: '2020년 10월 23일',
		content: 'test comment 3 입니다.',
	},
	{
		id: 4,
		createDate: '2020년 10월 24일',
		content: 'test comment 4 입니다.',
	},
];

const CommentList = ({ commentData }: any) => {
	const [content, onChangeContent, setContent] = useInput('');
	const router = useRouter();
	const { postId } = router.query;
	const dispatch = useDispatch();
	console.log(content);
	const onClickCreateCommentBtn = (e) => {
		dispatch({
			type: ADD_COMMENT_REQUEST,
			data: {
				postId,
				content,
			},
		});
		setContent('');
	};

	return (
		<CommentListWrapper className="post__comments">
			<div className="post__comments--title">
				<h3>{commentData.length} Comments</h3>
			</div>
			<div className="post__comments--create">
				<textarea placeholder="댓글을 작성하세요..." value={content} onChange={onChangeContent} />
				<Button text="Create Comment" type="submit" onClick={onClickCreateCommentBtn} />
			</div>
			<div className="post__comments--list">
				{commentData.map((comment: any) => (
					<CommentCard commentData={comment} key={comment.id} />
				))}
			</div>
		</CommentListWrapper>
	);
};

export default CommentList;
