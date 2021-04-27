/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { LOG_OUT_REQUEST } from '../../store/reducers/user';

import Link from 'next/link';

import SearchBar from '../Common/SearchBar';
import LoadingBar from '../Common/LoadingBar';

const Header = styled.header`
	position: fixed;
	z-index: 7;
    display: flex;
	justify-content: center;
	align-items: center;	
	margin-bottom: 3vh;
	width: 100%;
	height: 10vh;
	background-color: ${({theme}) => theme.bgColor};
	border-bottom: ${({theme}) => theme.borderBottom};
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:foucus {
			box-shadow: ${({theme}) => theme.focusBoxShadows};
		}
		&:hover {
			box-shadow: ${({theme}) => theme.focusBoxShadows};
		}
	}
	.header__logo {
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
		a{
			width: 100%;
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
		a{
			width: 100%;
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
		img {
			transition: transform 0.2s;
		}
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
		.header__user {
			display: none;
		}
	}
`;

const TopNavigation = () => {
    const { me } = useSelector<RootState, any>((state) => state.user);
	const dispatch = useDispatch();

	
    // test code
    // const me = {name: 'utopier'};
    // const isLoading = true;

    const clikedMenu = React.useRef(false);
	
    // Event Handler
    const onClickMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        console.log('onClickMenu');
      
        const leftNav: any = document.querySelector('.LeftNavigation');
		const menuImg: any = document.querySelector('.header__responsive-nav img');
        if (clikedMenu.current) {
			leftNav.style.display = 'none';
			menuImg.style.transform = 'rotate(0deg)';
			clikedMenu.current = false;

			leftNav?.removeAttribute('style');
		} else {
			leftNav.style.display = 'block';
			menuImg.style.transform = 'rotate(90deg)';
			clikedMenu.current = true;
		}
    }

    const onClickLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log('onClickLogout');
        dispatch({ type: LOG_OUT_REQUEST });
    }
	return (
        <>
			<LoadingBar/>
			<Header>			
					<div onClick={onClickMenu} className="header__responsive-nav">
						<img src="/icons/menu.svg" width="25" height="25" alt="메뉴 아이콘" />
					</div>
					<div className="header__logo">
						<Link href="/">
							<a>
								<img src="/icon-192x192.png" alt="logo" width="30" height="30" />
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