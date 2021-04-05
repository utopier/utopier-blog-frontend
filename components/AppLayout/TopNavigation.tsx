import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from 'next/link';
import BarLoader from 'react-spinners/BarLoader';

import SearchBar from '../Common/SearchBar';

const Header = styled.header`
	padding: 0 20px;
	display: flex;
	z-index: 7;
	height: 10vh;
	border-bottom: 1px solid #404b69;
	margin-bottom: 3vh;
	padding: 0 8px;
	border-top: 3px solid #00818a;
	position: fixed;
	background-color: #283149;
	width: 100%;
	a {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.header__logo {
		padding-right: 10px;
		display: flex;
		width: 10%;
		justify-content: center;
		align-itmes: center;
		h1 {
			margin-left: 15px;
			font-size: 1.4em;
			font-weight: 700;
			color: #00818a;
		}
	}
	@media (max-width: 1260px) {
		.header__logo {
			h1 {
				display: none;
			}
		}
	}
	.header__menu {
		display: flex;
		width: 40%;
		justify-content: space-around;
		align-itmes: center;
		a {
			width: 100%;
			&:foucus {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
			&:hover {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
		}
	}
	@media (max-width: 900px) {
		.header__menu {
			display: none;
		}
	}
	input {
		width: 96%;
	}
	.header__user {
		display: flex;
		width: 20%;
		justify-content: space-around;
		align-itmes: center;
		font-size: 0.8em;
		a {
			padding: 20px;
			&:foucus {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
			&:hover {
				box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
			}
		}
	}
	.header__user .header__user--logout {
		cursor: pointer;
	}
	.header__search-bar {
		width: 100%;
		height: 100%;
		display: flex;
		justify-conent: center;
		align-items: center;
		.header__search-bar-icon {
			display: none;
		}
	}
	.header__responsive-nav {
		display: none;
	}
	@media (max-width: 700px) {
		.header__user .header__user--logout {
			display: none;
		}
		.header__responsive-nav {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20%;
			cursor: pointer;
		}
		.header__logo {
			display: none;
		}
	}
`;
const override = css`
	position: fixed;
	z-index: 10;
`;

const TopNavigation = () => {
    // const { me } = useSelector<RootState, any>((state) => state.user);
	// const dispatch = useDispatch();

	// const {
	// 	loadMyInfoLoading,
	// 	loadUserLoading,
	// 	loadUsersLoading,
	// 	followLoading,
	// 	unfollowLoading,
	// 	logInLoading,
	// 	logOutLoading,
	// 	signUpLoading,
	// 	uploadImagesLoading,
	// 	removeImagesLoading,
	// 	changeNicknameLoading,
	// 	changeBioLoading,
	// 	loadFollowingsLoading,
	// 	loadFollowersLoading,
	// 	removeFollowerLoading,
	// } = useSelector<RootState, any>((state) => state.user);
	// const {
	// 	likePostLoading,
	// 	unlikePostLoading,
	// 	loadPostLoading,
	// 	loadPostsLoading,
	// 	loadTagsLoading,
	// 	addPostLoading,
	// 	updatePostLoading,
	// 	removePostLoading,
	// 	addCommentLoading,
	// 	updateCommentLoading,
	// 	removeCommentLoading,
	// 	postUploadImagesLoading,
	// 	postRemoveImagesLoading,
	// } = useSelector<RootState, any>((state) => state.post);
	// const isLoading =
	// 	loadMyInfoLoading ||
	// 	loadUserLoading ||
	// 	loadUsersLoading ||
	// 	followLoading ||
	// 	unfollowLoading ||
	// 	logInLoading ||
	// 	logOutLoading ||
	// 	signUpLoading ||
	// 	uploadImagesLoading ||
	// 	removeImagesLoading ||
	// 	changeNicknameLoading ||
	// 	changeBioLoading ||
	// 	loadFollowersLoading ||
	// 	loadFollowingsLoading ||
	// 	removeFollowerLoading ||
	// 	likePostLoading ||
	// 	unlikePostLoading ||
	// 	loadPostLoading ||
	// 	loadPostsLoading ||
	// 	loadTagsLoading ||
	// 	addPostLoading ||
	// 	updatePostLoading ||
	// 	removePostLoading ||
	// 	addCommentLoading ||
	// 	updateCommentLoading ||
	// 	removePostLoading ||
	// 	postUploadImagesLoading ||
	// 	postRemoveImagesLoading ||
	// 	removeCommentLoading;

    // test code
    const me = {name: 'utopier'};
    const isLoading = true;

    const clikedMenu = React.useRef(false);
	
    // Event Handler
    const onClickMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        console.log('onClickMenu');
      
        const leftNav: any = document.querySelector('.LeftNavigation');
		console.log(clikedMenu.current);
        console.log(leftNav);
        if (clikedMenu.current) {
			leftNav.style.display = 'none';
			clikedMenu.current = false;

			leftNav?.removeAttribute('style');
		} else {
			leftNav.style.display = 'block';
			clikedMenu.current = true;
		}
    }

    const onClickLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log('onClickLogout');
        // dispatch({ type: LOG_OUT_REQUEST });
    }
    return (
        <>
            <BarLoader css={override} width={2000} height={10} color={'#00818a'} loading={isLoading} />
            <Header>
				<div onClick={onClickMenu} className="header__responsive-nav">
					<img src="/icons/menu.svg" width="25" height="25" alt="메뉴 아이콘" />
				</div>
				<div className="header__logo">
					<Link href="/">
						<a>
							<img src="/icon-192x192.png" alt="logo" width="30" height="30" />
							<h1>Utopier</h1>
						</a>
					</Link>
				</div>
				<div className="header__menu">
					<Link href="/posts">
						<a>Posts</a>
					</Link>
					<Link href="/tags">
						<a>Tags</a>
					</Link>
					<Link href="/users">
						<a>Users</a>
					</Link>
				</div>
				<div className="header__search-bar">
					<SearchBar id="main-search-bar" placeholder="...search" />
				</div>
				<div className="header__user">
					{me ? (
						<>
							<a className="header__user--logout" onClick={onClickLogout}>
								logout
							</a>
							<Link href="/user">
								<a>
									<img src="/icons/user.svg" width="25" height="25" alt="" />
								</a>
							</Link>
						</>
					) : (
						<>
							<Link href="/signup">
								<a>signup</a>
							</Link>
							<Link href="/login">
								<a>login</a>
							</Link>
						</>
					)}
				</div>
			</Header>
        </>
    )
};

export default TopNavigation;