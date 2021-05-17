/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../Common/Button';
import React from 'react';

import {SerializedStyles} from '@emotion/serialize'

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { LOG_OUT_REQUEST } from '../../store/reducers/user';


// import Switch from 'react-switch';
//import { askPermission, subscribeUser } from '../../public/push';

const LeftNavigationWrapper = styled.nav`
	position: fixed;
	width: 170px;
	height: 100%;
	border-right: 1px solid ${({theme}) => theme.bgColor2};
	margin-top: 10vh;
	z-index: 1000;
	background-color: ${({theme})=>theme.bgColor};
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		a {
			margin-left: 5px;
		}
	}
	div:hover {
		cursor: pointer;
		background-color: ${({theme}) => theme.bgColor2};
	}
	@media (max-width: 700px) {
		display: none;
	}
	@media (min-width: 700px) {
		display: block;
		z-index: 1000;
	}
	.push-toggle-switch {
		margin: 10px 0;
		height: 100px;
		cursor: pointer;
		box-shadow: ${({theme}) => theme.focusBoxShadows};
		&:hover {
			cursor: pointer;
			background-color: ${({theme}) => theme.bgColor2};
		}
	}
	@media (hover: none) and (pointer: coarse) {
		div:hover {
			cursor: pointer;
			background-color: ${({theme}) => theme.bgColor2};
		}
	}
`;

const LeftNavigation = () => {
	const { me } = useSelector<RootState, any>((state) => state.user);
	const dispatch = useDispatch();

    const router = useRouter();
    let [leftNavHoverStyle, setLeftNavHoverStyle] = React.useState<SerializedStyles>();
   
   
    //const [isCheckedPushToggle, setIsCheckedPushToggle] = useState(false);
	// const onChangePushToggle = () => {
	// 	setIsCheckedPushToggle(!isCheckedPushToggle);
	// 	// 브라우저 푸시 지원 여부 확인
	// 	if (!('serviceWorker' in navigator) && !('PushManager' in window)) {
	// 		alert('Push Message 지원하지 않음, 최신 Chrome 브라우저를 사용하세요');
	// 		return;
	// 	}

	// 	if (!isCheckedPushToggle) {
	// 		// 권한 요청
	// 		askPermission();
	// 		// PushManager로 사용자 구독
	// 		subscribeUser();

	// 		//router.reload();
	// 	}
	// };

	// const changeToggle = () => {
	// 	if (Notification.permission === 'granted') {
	// 		setIsCheckedPushToggle(true);
	// 	} else {
	// 		setIsCheckedPushToggle(false);
	// 	}
	// };
	// useEffect(() => {
	// 	changeToggle();
	// }, [isCheckedPushToggle]);

    useEffect(() => {
        setLeftNavHoverStyle(pageName(router.pathname));
    },[router.pathname]);

    const pageName = (pageName: string) => {
        if (pageName === '/') {
            return css`
                .left-nav--home {
                    background-color: #404b69;
                    border-right: 3px solid #00818a;
                }
            `;
        } else if (pageName.match('post')) {
            return css`
                .left-nav--posts {
                    background-color: #404b69;
                    border-right: 3px solid #00818a;
                }
            `;
        } else if (pageName.match('tag')) {
            return css`
                .left-nav--tags {
                    background-color: #404b69;
                    border-right: 3px solid #00818a;
                }
            `;
        } else if (pageName.match('user')) {
            return css`
                .left-nav--users {
                    background-color: #404b69;
                    border-right: 3px solid #00818a;
                }
            `;
        } else if (pageName.match('trends')) {
            return css`
                .left-nav--trends {
                    background-color: #404b69;
                    border-right: 3px solid #00818a;
                }
            `;
        } else {
            return css``;
        }
    };

	const onClickLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log('onClickLogout');
        dispatch({ type: LOG_OUT_REQUEST });
    }

	return (
		<LeftNavigationWrapper css={leftNavHoverStyle} className="LeftNavigation">
			<div className="left-nav--home">
				<img src="/icons/home.svg" width="20" height="20" alt="" />
				<Link href="/">
					<a>Home</a>
				</Link>
			</div>
			<div className="left-nav--posts">
				<img src="/icons/posts.svg" width="20" height="20" alt="" />
				<Link href="/posts">
					<a>Posts</a>
				</Link>
			</div>
			<div className="left-nav--tags">
				<img src="/icons/tags.svg" width="20" height="20" alt="" />
				<Link href="/tags">
					<a>Tags</a>
				</Link>
			</div>
			<div className="left-nav--users">
				<img src="/icons/users.svg" width="20" height="20" alt="" />
				<Link href="/users">
					<a>Users</a>
				</Link>
			</div>
			<div className="left-nav--chat">
				<img src="/icons/chat.svg" width="20" height="20" alt="" />
				<Link href="/chat">
					<a>Chat</a>
				</Link>
			</div>
			<div className="left-nav--trends">
				<img src="/icons/trends.svg" width="20" height="20" alt="" />
				<Link href="/trends">
					<a>Trends</a>
				</Link>
			</div>
            {me && (
				<div className="push-toggle-switch">
					<label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<span style={{ marginBottom: '10px' }}>Post Push Message</span>
						{/* <Switch onChange={onChangePushToggle} checked={isCheckedPushToggle} /> */}
					</label>
				</div>
			)}
            <Button id="pwaInstall" aria-label="Install" hidden text="PWA Install" width="170px" height="30px">
                Install App
			</Button>
			{me ? (
							<>
								<div>
									<Link href="/user">
										<a>
											<img src="/icons/user.svg" width="25" height="25" alt="" />
										</a>
									</Link>
								</div>
								<div>
									<a className="header__user--logout" onClick={onClickLogout}>
										logout
									</a>
								</div>
							</>
						) : (
							<>
								<div>
									<Link href="/signup">
										<a>signup</a>
									</Link>
								</div>
								<div>
									<Link href="/login">
										<a>login</a>
									</Link>
								</div>
							</>
			)}
			</LeftNavigationWrapper>
	);
};

export default LeftNavigation;
