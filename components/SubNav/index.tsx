import styled from '@emotion/styled';
import { useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../Common/SearchBar';
import Button from '../Common/Button';
import { LOAD_POSTS_REQUEST, LOAD_TAGS_REQUEST } from '../../store/reducers/post';
import { LOAD_USERS_REQUEST } from '../../store/reducers/user';
import { RootState } from '../../store/reducers';

const PostSubNavWrapper = styled.div`
	display: flex;
	height: 100px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #404b69;
	.subNav--title {
		width: 80%;
		height: 50%;
		display: flex;
		justify-content: space-between;
		h2 {
			display: flex;
			align-items: center;
			font-size: 2.5em;
			font-weight: 700;
			color: #00818a;
		}
		div {
			display: flex;
			align-items: center;
		}
	}
	.filter {
		display: flex;
		width: 80%;
		height: 50%;
		justify-content: space-between;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		h3 {
			display: flex;
			align-items: center;
		}
		.subNav__dropdown-btn {
			display: none;
		}
	}
	.search--icon {
		top: 10px;
		right: -15%;
	}
	@media (max-width: 450px) {
		.filter .subNav__btn-group {
			display: none;
		}
		.filter .subNav__dropdown-btn {
			display: flex;
		}
	}
`;

const SubNav = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const route = router.route.slice(1).toUpperCase();
	const isDESC = useRef(null);
	const isPopular = useRef(null);
	const { allTagsCount, searchedTagsCount, allPostsCount, searchedPostsCount } = useSelector<RootState, any>(
		(state) => state.post
	);
	const { allUsersCount, searchedUsersCount } = useSelector<RootState, any>((state) => state.user);

	const onClickNewest = useCallback(
		(e) => {
			isDESC.current = !isDESC.current;
			dispatch({
				type: route === 'POSTS' ? LOAD_POSTS_REQUEST : route === 'TAGS' ? LOAD_TAGS_REQUEST : LOAD_USERS_REQUEST,
				data: {
					orderBy: isDESC.current ? 'DESC' : 'ASC',
					popular: isPopular.current === null ? '' : isPopular.current ? 'DESC' : 'ASC',
				},
			});
		},
		[isDESC.current]
	);
	const onClickPopular = useCallback(() => {
		isPopular.current = !isPopular.current;
		dispatch({
			type: LOAD_POSTS_REQUEST,
			data: {
				orderBy: isDESC.current === null ? '' : isDESC.current ? 'DESC' : 'ASC',
				popular: isPopular.current ? 'DESC' : 'ASC',
			},
		});
	}, [isPopular.current]);
	return (
		<PostSubNavWrapper>
			<div className="subNav--title">
				<h2>{route}</h2>
				<div className="subNav__post-create-btn">
					{route === 'POSTS' ? (
						<Link href="/post/create">
							<Button type="button" text="Create Post" borderRadius="5px" />
						</Link>
					) : null}
				</div>
			</div>
			<div className="filter">
				<div>
					{route === 'POSTS' ? (
						<>
							<h3>All {allPostsCount} posts</h3>
							<h2>{searchedPostsCount && `||Searched post : ${searchedPostsCount}`}</h2>
						</>
					) : (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div>
								{route === 'TAGS' ? (
									<>
										<h2> All {allTagsCount} tags</h2>
										<h3>{searchedTagsCount && `||Searched tag : ${searchedTagsCount}`}</h3>
									</>
								) : route === 'USERS' ? (
									<>
										<h2>All {allUsersCount} users </h2>
										<h3>{searchedUsersCount && ` ||Searched user : ${searchedUsersCount}`}</h3>
									</>
								) : null}
							</div>
							<SearchBar
								id="subnav_searchbar"
								placeholder={route === 'USERS' ? 'User Search...' : route === 'TAGS' ? 'Tag Search...' : 'Search...'}
							/>
						</div>
					)}
				</div>
				<div className="subNav__btn-group">
					<Button type="button" text="Newest" onClick={onClickNewest} borderRadius="5px" />
					<Button type="button" text="Popular" onClick={onClickPopular} borderRadius="5px" />
				</div>
				<div className="subNav__dropdown-btn">
					<Button type="button" text="Filter" borderRadius="5px" />
				</div>
			</div>
		</PostSubNavWrapper>
	);
};

export default SubNav;
