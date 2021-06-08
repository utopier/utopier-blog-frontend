import WysiwygViewer from '../../../components/WysiwygViewer';
import styled from '@emotion/styled';
import TagButton from '../../../components/Common/TagButton';
import CommentList from '../../../components/CommentList';

import Head from 'next/head';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import {useState, useEffect} from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../../store';

import { LOAD_MY_INFO_REQUEST, LOAD_USERS_REQUEST } from '../../../store/reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import {
	LOAD_POSTS_REQUEST,
	LOAD_POST_REQUEST,
	LIKE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
} from '../../../store/reducers/post';
import { RootState } from '../../../store/reducers';

const WysiwygViewerWrapper = styled.div`
	padding: 10px;
	.te-preview {
		background-color: none;
		color: white;
	}
	.tui-editor-contents p {
		color: white;
	}
	.tui-editor-contents h1,
	.tui-editor-contents h2,
	.tui-editor-contents h3,
	.tui-editor-contents h4,
	.tui-editor-contents h5,
	.tui-editor-contents h6 {
		color: white;
	}
	.tui-editor-contents del {
		color: gray;
	}
	.tui-editor-contents ol > li::before {
		color: white;
	}
	.tui-editor-contents table,
	.tui-editor-contents table th,
	.tui-editor-contents table td {
		border-color: #dbedf3;
		color: white;
	}
	.tui-editor-contents table th {
		background-color: #00818a;
	}
	.tui-editor-contents pre {
		background-color: #404b69;
	}
	.tui-editor-contents pre code {
		color: white;
		background-color: #404b69;
	}
	.task-list-item {
		color: white;
	}
`;

const PostPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3px;
	.post__info {
		justify-content: center;
		display: flex;
		width: 100%;
		.post__info--title {
			max-width: 400px;
			width: 100%;
			min-height: 250px;
			.post__info--title-text {
				border: 1px solid #dbedf3;
				border-radius: 5px;
				box-shadow: 0 0 20px #00818a;
				min-height: 170px;
				padding-top: 10px;
				padding-left: 5px;
				h2 {
					height: 60px;
					font-size: 2em;
					font-weight: 500;
				}
				div {
					display: flex;
					align-items: center;
				}
			}
			.post__info--title-detail {
				border: 1px solid #dbedf3;
				border-radius: 5px;
				box-shadow: 0 0 20px #00818a;
				min-height: 80px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				button {
					background-color: transparent;
					border: 0;
					cursor: pointer;
				}
			}
		}
		.post__main-img {
			max-width: 400px;
			width: 100%;
			min-height: 250px;
			border: 1px solid #dbedf3;
			border-radius: 5px;
			box-shadow: 0 0 20px #00818a;
			img {
				width: 100%;
				min-height: 250px;
			}
		}
	}
	.post__viewer {
		border: 1px solid #dbedf3;
		border-radius: 5px;
		box-shadow: 0 0 20px #00818a;
		margin: 0 2px;
		min-height: 500px;
		max-width: 1000px;
		width: 100%;
	}
	.post__comments {
		border: 1px solid #dbedf3;
		border-radius: 5px;
		box-shadow: 0 0 20px #00818a;
		min-height: 100px;
		max-width: 600px;
		width: 100%;
	}

	@media (max-width: 900px) {
		.post__info {
			flex-direction: column;
			align-items: center;
		}
	}
`;

const PostPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const dispatch = useDispatch();
	const { me } = useSelector<RootState, any>((state) => state.user);
	const { singlePost, likePostDone, likePostError } = useSelector<RootState, any>((state) => state.post);
	const {
		id,
		createdDate,
		updatedDate,
		title,
		content,
		mainImgUrl,
		author,
		comments,
		images,
		tags,
		likers,
	} = singlePost;
	const [isLiked, setIsLiked] = useState(me && likers && likers.find((v) => v.id === me.id))
	useEffect(() => {
		if(likePostDone && !likePostError){
			setIsLiked(true);
		}
		console.log('singlePost : ',singlePost.likers)
	},[likePostDone]);
	const onClickLikeBtn = (e) => {
		if (isLiked) {
			dispatch({ type: UNLIKE_POST_REQUEST, data: id });
			setIsLiked(false);
			console.log('singlePost : ',singlePost)
		} else {
			dispatch({ type: LIKE_POST_REQUEST, data: id });
		}
	};
	
	return (
		<>
			<Head>
				<title>Utoiper - {title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
				<script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.js"></script>
				<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
			</Head>
			<PostPageWrapper>
				<div className="post__info">
					<div className="post__info--title">
						<div className="post__info--title-text">
							<h2>{title}</h2>
							<div>{tags && tags.map(({ name, id }) => <TagButton id={id} name={name} />)}</div>
						</div>
						<div className="post__info--title-detail">
							<p style={{ width: '50px', textAlign: 'center' }}>
								<button onClick={onClickLikeBtn}>
									{isLiked ? (
										<img src="/icons/liked.svg" width="30" height="30" alt="좋아요" />
									) : (
										<img src="/icons/unliked.svg" width="30" height="30" alt="좋아요취소" />
									)}
								</button>
								<br />
								<p style={{ textAlign: 'center', width: '100%' }}>{(likers && likers.length) || '0'}</p>
							</p>
							<p style={{ lineHeight: 2 }}>
								{createdDate && createdDate}
								<br />
								{updatedDate}
							</p>

							<p>
								<img src={'/images/avatar.svg'} width="50" height="50" alt="유저 아바타" />
								<br />
								<span>{author && author.nickname}</span>
							</p>
						</div>
					</div>
					<div className="post__main-img">
						<img src={(mainImgUrl && mainImgUrl.src) || '/images/postMainDefault.jpg'} alt="포스트 메인 이미지" />
					</div>
				</div>
				<WysiwygViewerWrapper className="post__viewer">
					<WysiwygViewer content={content} />
				</WysiwygViewerWrapper>
				<CommentList commentData={comments} />
			</PostPageWrapper>
		</>
	);
};

// schema
// const blogSchema = (postData) => {
// 	console.log(postData);
// 	const {
// 		id,
// 		title,
// 		summary,
// 		mainImgUrl,
// 		author: { username, avatarUrl },
// 		updatedDate,
// 		tags,
// 		likes,
// 		content,
// 	} = postData;

// 	const result = `
// 		“@context”: “http://schema.org”,
// 		“@type”: “BlogPosting”,
// 		“mainEntityOfPage”:{
// 		“@type”:”WebPage”,
// 		“@id”:”http://applefostering.co.uk/skills-foster/”
// 		},
// 		“headline”: ${title},
// 		“image”: {
// 		“@type”: “ImageObject”,
// 		“url”: ${mainImgUrl},
// 		“height”: 463,
// 		“width”: 700
// 		},
// 		“datePublished”: “2016-02-12”,
// 		“dateModified”: ${updatedDate},
// 		“author”: {
// 		“@type”: “Person”,
// 		“name”: ${username}
// 		},
// 		“publisher”: {
// 		“@type”: “Organization”,
// 		“name”: “Utopier Blog”,
// 		“logo”: {
// 		“@type”: “ImageObject”,
// 			“url”: “/icon-192x192.png”,
// 			“width”: 550,
// 			“height”: 60
// 		}
// 		},
// 		“description”: “A brief description of your article”,
// 		“articleBody”: “You can put your entire article in here: it can be as long as you want.”
// 	}`;

// 	return {};
// };

export const getServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.cookie = '';
	console.log(context.req.headers);
	if (context.req && cookie) {
		axios.defaults.headers.cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_USERS_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_POSTS_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_POST_REQUEST,
		data: context.query.postId,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default PostPage;
