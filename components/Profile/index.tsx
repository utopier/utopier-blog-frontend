import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../Common/Button';
import PostList from '../PostList';
import UserList from '../UserList';
import useInput from '../../hooks/useInput';
import { RootState } from '../../store/reducers';
import {
	UPLOAD_IMAGES_REQUEST,
	REMOVE_IMAGES_REQUEST,
	CHANGE_NICKNAME_REQUEST,
	CHANGE_BIO_REQUEST,
} from '../../store/reducers/user';

const ProfileWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		width: 85%;
		.profile__user-info-card {
			display: flex;
			margin: 0 5vw;
			border: 1px solid #dbedf3;
			border-radius: 5px;
			box-shadow: 0 0 20px #00818a;
			.profile__user-info-card--avatar {
				display: flex;
				justify-content: center;
				border: 1px solid #dbedf3;
				border-radius: 5px;
				box-shadow: 0 0 20px #00818a;
			}
			.prfile__user-info-card--intro {
				width: 100%;
				height: 100%;
				line-height: 30px;
				span {
					font-size: 1.2em;
					line-height: 15px;
				}
				div {
					width: 95%;
				}
				div:first-child {
					padding-left: 10px;
				}
				div:last-child {
					margin-left: 5px;
					p {
						border-radius: 5px;
						border: 1px solid #dbedf3;
						height: 100%;
					}
				}
			}
		}
		.profile__user-contents {
			padding: 0;
			margin: 0;
			width: 100%;
			.profile__user-contents--nav {
				display: flex;
				div {
					height: 30px;
					width: 100px;
					display: flex;
					justfy-content: center;
					align-content: center;
				}
			}
			.profile__user-contents--body {
				padding-top: 20px;
				display: flex;
				justify-content: center;
				align-content: center;
				min-height: 450px;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				box-shadow: 0 0 20px #00818a;
				li {
					display: flex;
					justify-content: center;
				}
			}
		}
	}
	@media (max-width: 800px) {
		.profile__user-info-card {
			flex-direction: column;
		}
		.profile__user-info-card--avatar {
			width: 100%;
		}
		.profile__user-contents--nav {
			width: 100%;
		}
		div .profile__user-contents .profile__user-contents--nav div {
			width: 100%;
		}
	}
	@media (max-width: 380px) {
		div .profile__user-info-card {
			margin: 0;
			width: 100%;
		}
		div .profile__user-contents .profile__user-contents--nav {
			display: grid;
			height: 60px;
			width: 100%;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
		}
	}
	.post-list-wrapper {
		grid-template-columns: repeat(3, 1fr);
	}
	.user-list-wrapper {
		grid-template-columns: repeat(3, minmax(250px, 1fr));
	}
	@media (max-width: 1200px) {
		.post-list-wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
		.user-list-wrapper {
			grid-template-columns: repeat(2, minmax(250px, 1fr));
		}
	}
	@media (max-width: 880px) {
		.post-list-wrapper {
			grid-template-columns: repeat(1, minmax(300px, 400px));
		}
		.user-list-wrapper {
			grid-template-columns: repeat(1, minmax(250px, 1fr));
		}
	}
	.profile__nickname {
		display: ${(props: any) => (props.clikedUpdateNickBtn ? 'none' : 'static')};
	}
	.profile__nickname-input {
		display: ${(props: any) => (props.clikedUpdateNickBtn ? 'static' : 'none')};
	}
	.profile__bio {
		display: ${(props: any) => (props.clikedUpdateBioBtn ? 'none' : 'static')};
	}
	.profile__bio-textarea {
		display: ${(props: any) => (props.clikedUpdateBioBtn ? 'static' : 'none')};
	}
`;

const Profile = ({ userData }: any): any => {
	if (!userData) {
		return '...로딩중';
	}
	const [clikedUpdateNickBtn, setCliekdUpdateNickBtn] = useState(false);
	const [commentUpdateNickInput, onChangecommentUpdateNickInput] = useInput('');
	const [clikedUpdateBioBtn, setCliekdUpdateBioBtn] = useState(false);
	const [commentUpdateBioTextarea, onChangecommentUpdateBioTextarea] = useInput('');
	const { id, avatar, email, nickname, bio, posts, comments, likeposts, followings, followers } = userData;
	const router = useRouter();
	const dispatch = useDispatch();
	const { createAvatarImg } = useSelector<RootState, any>((state) => state.user);
	const { me } = useSelector<RootState, any>((state) => state.user);
	const onClickProfileNavBtn = (e) => {
		const navName = e.target.labels[0].outerText;
		if (!!router.query.userId) {
			router.push({
				pathname: `/user/${id}`,
				query: { navName },
			});
		} else {
			router.push({
				pathname: '/user',
				query: { navName },
			});
		}
	};
	const navName = router.query.navName;

	const onChangeAvatarImg = (e) => {
		const imageFormData = new FormData();
		imageFormData.append('image', e.target.files[0]);
		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData,
		});
	};
	const onRemoveAvatarImg = () => {
		dispatch({
			type: REMOVE_IMAGES_REQUEST,
			data: { imgPath: createAvatarImg.slice(56) },
		});
	};
	const onClickNickUpdateBtn = () => {
		setCliekdUpdateNickBtn(!clikedUpdateNickBtn);
	};
	const onClickNickConfirmBtn = () => {
		dispatch({
			type: CHANGE_NICKNAME_REQUEST,
			data: {
				nickname: commentUpdateNickInput,
			},
		});
		setCliekdUpdateNickBtn(!clikedUpdateNickBtn);
	};

	const onClickBioUpdateBtn = () => {
		setCliekdUpdateBioBtn(!clikedUpdateBioBtn);
	};
	const onClickBioConfirmBtn = () => {
		dispatch({
			type: CHANGE_BIO_REQUEST,
			data: {
				bio: commentUpdateBioTextarea,
			},
		});
		setCliekdUpdateBioBtn(!clikedUpdateBioBtn);
	};
	return (
		<ProfileWrapper clikedUpdateNickBtn={clikedUpdateNickBtn} clikedUpdateBioBtn={clikedUpdateBioBtn}>
			<div>
				<div className="profile__user-info-card">
					<div className="profile__user-info-card--avatar" style={{ display: 'flex', flexDirection: 'column' }}>
						<img
							src={createAvatarImg || (avatar && avatar.src) || '/images/avatar.svg'}
							width="100%"
							height="200vh"
							alt="유저 아바타"
						/>
						{me && me.id === id && (
							<div style={{ width: '250px' }}>
								<input id="mainImage" type="file" onChange={onChangeAvatarImg} style={{ width: '200px' }} />
								<button style={{ display: 'inline-block' }} className="remove-img-btn" onClick={onRemoveAvatarImg}>
									X
								</button>
							</div>
						)}
					</div>
					<div className="prfile__user-info-card--intro">
						<div>
							<span className="profile__nickname">Nickname : {nickname}</span>
							{me && me.id === id && (
								<div>
									<div className="profile__nickname-input">
										<input
											style={{ width: '200px' }}
											type="text"
											onChange={onChangecommentUpdateNickInput}
											value={commentUpdateNickInput}
										/>
										<Button onClick={onClickNickConfirmBtn} text="확인" width="120px" />
									</div>
									<Button onClick={onClickNickUpdateBtn} text="수정" width="120px" />
								</div>
							)}
							<br />
							<span>Email : {email}</span>
						</div>
						<div>
							<p className="profile__bio">
								{(me && me.bio && bio) ||
									`"Check out my book Data Analysis Using SQL and Excel". I have a blog with periodic posts about data
								analysis and SQL here at blog.data-miners.com.`}
							</p>
							{me && me.id === id && (
								<div>
									<div className="profile__bio-textarea">
										<textarea
											style={{ width: '100%', height: '80px' }}
											onChange={onChangecommentUpdateBioTextarea}
											value={commentUpdateBioTextarea}
										/>
										<Button onClick={onClickBioConfirmBtn} text="확인" width="120px" />
									</div>
									<Button onClick={onClickBioUpdateBtn} text="수정" width="120px" />
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="profile__user-contents">
					<div className="profile__user-contents--nav">
						<Button text="Posts" borderRadius="3px" onClick={onClickProfileNavBtn} id="posts-btn" label="posts" />
						<Button
							text="LikePosts"
							borderRadius="3px"
							onClick={onClickProfileNavBtn}
							id="likeposts-btn"
							label="likeposts"
						/>
						<Button
							text="Followers"
							borderRadius="3px"
							onClick={onClickProfileNavBtn}
							id="followers-btn"
							label="followers"
						/>
						<Button
							text="Followings"
							borderRadius="3px"
							onClick={onClickProfileNavBtn}
							id="followings-btn"
							label="followings"
						/>
					</div>
					<div className="profile__user-contents--body">
						{!navName || navName === 'posts' ? (
							<PostList postData={posts} />
						) : navName === 'likeposts' ? (
							<PostList postData={likeposts} />
						) : navName === 'followers' ? (
							<UserList userData={followers} />
						) : navName === 'followings' ? (
							<UserList userData={followings} />
						) : null}
					</div>
				</div>
			</div>
		</ProfileWrapper>
	);
};

export default Profile;
