import styled from '@emotion/styled';
// import Button from '../Common/Button';
import { useState, useContext, useEffect, useCallback, useRef } from 'react';
// import { useBeforeunload } from 'react-beforeunload';
import { SocketContext } from '../../utils/socket-context';
// import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// import { ADD_USER_TO_ROOM, REMOVE_USER_TO_ROOM } from '../../store/reducers/user';
import _ from 'lodash';
import { RootState } from '../../store/reducers';

import useInput from '../../hooks/useInput';
// import { SelectionState } from 'draft-js';

const ChatRoomWrapper = styled.div`
	height: 100%;
	display: flex;
	.chat__room-user-list {
		width: 20%;
		.chat__room-user-list--title {
			height: 10%;
			padding: 10px;
			padding-left: 30px;
			font-size: 2em;
			font-weight: 600;
		}
		.chat__room-user-card {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.chat__room-body {
		height: 100%;
		min-height: 600px;
		width: 80%;
	}
	.chat__room-body--message-list {
		overflow: auto;
		height: 90%;
		.chat__room-body--title {
			height: 10%;
			padding: 10px;
			padding-left: 30px;
			font-size: 2em;
			font-weight: 600;
		}
		.chat__room--message-card {
			display: flex;
			width: 100%;
			min-height: 80px;
			.message-card--user-avatar {
				width: 100px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.message-card--detail {
				width: 100%;
				.message-card--detail-meesage {
					padding-top: 10px;
				}
			}
		}
	}
	.chat__room-body--message-field {
		display: flex;
		height: 10%;
		input {
			width: 100%;
			height: 100%;
		}
	}
`;

const ChatRoom = () => {
	const { me } = useSelector<RootState, any>((state) => state.user);
	const [messages, setMessages] = useState<any[]>([]);
	const socket = useContext(SocketContext);
	const [messageInput, onChageMessageInput, setMessageInput] = useInput(null);
	const [randomNick, setRandomNick] = useState(`손님${Math.floor(Math.random() * 1000)}`);
	const [chatUsers, setChatUsers] = useState<any[]>([]);

	const onKeyPressMessageInput = (e: any) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const sendMessage = () => {
		socket.emit('message', {
			type: 'chat',
			avatar: (me && me.avatar.src) || '/images/avatar.svg',
			nickname: (me && me.nickname) || randomNick,
			message: messageInput,
		});
		setMessageInput('');
	};
	const receiveMessage = () => {
		socket.on('message', (data: any) => {
			setMessages([...messages, data]);
		});
	};

	const sendJoinUser = useCallback(() => {
		console.log('sendJoinUser Func');
		socket.emit('join', {
			type: 'join',
			nickname: (me && me.nickname) || randomNick,
			avatar: (me && me.avatar && me.avatar.src) || '/images/avatar.svg',
		});
	}, []);
	const getJoinUser = useCallback(() => {
		socket.on('join', ({ data, chatUsers }: any) => {
			setMessages([...messages, data]);
			setChatUsers(chatUsers);
		});
	}, []);

	const sendLeaveUser = useCallback(() => {
		socket.emit('leave', { type: 'leave', nickname: (me && me.nickname) || randomNick });
	}, []);
	const getLeaveUser = () => {
		socket.on('leave', ({ data, chatUsers }: any) => {
			setMessages([...messages, data]);
			setChatUsers(chatUsers);
		});
	};
	useEffect(() => {
		sendJoinUser();
		return () => {
			sendLeaveUser();
		};
	}, []);
	useEffect(() => {
		receiveMessage();
		getJoinUser();
		getLeaveUser();
	});
	console.log('state chatusers : ', chatUsers);
	return (
		<>
			<ChatRoomWrapper>
				<div className="chat__room-body">
					<div className="chat__room-body--message-list">
						<div className="chat__room-body--title">
							<h2>React</h2>
						</div>
						{messages.map(({ type, nickname, avatar, message }) => {
							if (type === 'chat') {
								return (
									<div className="chat__room--message-card">
										<div className="message-card--user-avatar">
											<img src={avatar} width="50px" height="50px" />
										</div>
										<div className="message-card--detail">
											<div>
												<span>{nickname}</span>
												<span>12:04 PM</span>
											</div>
											<div>
												<p>{message}</p>
											</div>
										</div>
									</div>
								);
							} else if (type === 'join') {
								return (
									<div className="chat__room--message-card">
										<div className="message-card--detail">
											<div>
												<p>{nickname}이 입장하였습니다.</p>
											</div>
										</div>
									</div>
								);
							} else if (type === 'leave') {
								return (
									<div className="chat__room--message-card">
										<div className="message-card--detail">
											<div>
												<p>{nickname}이 퇴장하였습니다.</p>
											</div>
										</div>
									</div>
								);
							}
						})}
					</div>
					<div className="chat__room-body--message-field">
						<input
							type="text"
							value={messageInput}
							onChange={onChageMessageInput}
							onKeyPress={onKeyPressMessageInput}
						/>
					</div>
				</div>
				<div className="chat__room-user-list">
					<div className="chat__room-user-list--title">
						<h2>User List</h2>
					</div>
					<div>
						{chatUsers &&
							chatUsers.map(({ nickname, avatar }) => {
								return (
									<div className="chat__room-user-card">
										<img src={avatar} width="45" height="45" />
										<span>{nickname}</span>
									</div>
								);
							})}
					</div>
				</div>
			</ChatRoomWrapper>
		</>
	);
};

export default ChatRoom;
