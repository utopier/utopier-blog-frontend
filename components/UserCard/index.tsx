import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../store/reducers/user';
import { RootState } from '../../store/reducers';

const UserCardWarpper = styled.div`
	width: 200px;
	height: 150px;
	display: flex;
	flex-direction: column;
	.user-info {
		line-height: 1.5;
		display: flex;
		border-radius: 5px;
		&:foucus {
			box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
		}
		&:hover {
			box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
		}
	}
	.user-follow {
		margin-top: 7px;
		display: flex;
		width: 100%;
		line-height: 1.3;
		div {
			margin-left: 20px;
		}
		.follow-icon button {
			background-color: transparent;
			border: 0;
		}
		.follow-icon img {
			cursor: pointer;
			border-radius: 4px;
			&:foucus {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
			&:hover {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
		}
	}
`;

const UserCard = ({ userData }: any) => {
	console.log('rendering usercard')
	const { id, avatar, email, nickname, posts, followers, followings } = userData;
	const router = useRouter();
	const { me } = useSelector<RootState, any>((state) => state.user);
	const dispatch = useDispatch();
	const [isFollowing, setIsFollowings] = useState(me && me.followings.find((v) => v.id == id));
	// let isFollowing = me && me.followings.find((v) => v.id === id);
	console.log('UserCard me : ', me);
	useEffect(() => {
		setIsFollowings(me && me.followings.find((v) => v.id == id));
	},[me])
	const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push(`/user/${id}`);
	}, []);
	const onClickFollowBtn = (
		(e) => {
			if (isFollowing) {
				dispatch({ type: UNFOLLOW_REQUEST, data: id });
			} else {
				dispatch({ type: FOLLOW_REQUEST, data: id });
			}
		}
	);

	return (
		<UserCardWarpper>
			<a href={`/user/${id}`} onClick={handleClick}>
				<div className="user-info">
					<div>
						<img
							src={(avatar && avatar.src) || '/images/avatar.svg'}
							width="70"
							height="70"
							style={{ marginRight: '10px' }}
							alt="유저 아바타"
						/>
					</div>
					<div>
						<span>{nickname}</span>
						<br />
						<span>{email}</span>
						<br />
						<span>{posts ? posts.length : ''} posts</span>
					</div>
				</div>
			</a>
			<div className="user-follow">
				<div className="follow-icon">
					<button onClick={onClickFollowBtn}>
						{isFollowing ? (
							<img src="/icons/unfollow.svg" width="30" height="30" alt="언팔로우" />
						) : (
							<img src="/icons/follow.svg" width="30" height="30" alt="팔로우" />
						)}
					</button>
				</div>
				<div>
					<span>{followers ? followers.length : ''} followers</span>
					<br />
					<span>{followings ? followings.length : ''} followings</span>
				</div>
			</div>
		</UserCardWarpper>
	);
};

export default UserCard;
