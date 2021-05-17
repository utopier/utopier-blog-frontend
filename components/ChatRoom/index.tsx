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

import Button from '../Common/Button'

import useInput from '../../hooks/useInput';
// import { SelectionState } from 'draft-js';

const ChatRoomWrapper = styled.div`
	height: 100%;
	display: flex;
	.chat__room-user-list {
		width: 20%;
		overflow: auto;
		overflow-x:hidden;
		overflow-y:visible;
		background-color: none;
		height: 630px;
		.chat__room-user-list--title {
			height: 10%;
			padding: 10px;
			padding-left: 30px;
			font-size: 2em;
			font-weight: 600;
			button {
				display: none;
			}
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
	.chat__room-body--title {
		background-color: #283149;
		display: flex;
		height: 10%;
		padding: 10px;
		padding-left: 30px;
		font-size: 2em;
		font-weight: 600;
		img {
			display: none;
		}
	}
	.chat__room-body--message-list {
		overflow: auto;
		overflow-x:hidden;
		overflow-y:visible;
		height: 500px;
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
	@media(max-width: 1200px){
		.chat__room-body--title{
			justify-content: space-between;
			img {
				display: block;
				cursor: pointer;
			}
		}
		.chat__room-user-list{
			display: none;
			background-color: #283149;
			transform: 0.5s;
			right:0;
		}
		.chat__room-user-list{
			.chat__room-user-list--title {
				display: flex;
				justify-content: space-around;
				button {
					display: block;
					transition: 0.5s;
				}
			}
		}
		.chat__room-body{
			width: 100%;
			z-index: 1;
		}
	}
`;

const ChatRoom = () => {
	const { me } = useSelector<RootState, any>((state) => state.user);
	const [messages, setMessages] = useState<any[]>([]);
	const socket = useContext(SocketContext);
	const [messageInput, onChageMessageInput, setMessageInput] = useInput('');
	const [randomNick, setRandomNick] = useState(`손님${Math.floor(Math.random() * 1000)}`);
	const [chatUsers, setChatUsers] = useState<any[]>([]);

	let elem;

	console.log(socket);
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
		getDisconnectUser();
		console.log('------------ ChatRoom Rendering useEffect --------')
	});
	useEffect(() => {
		elem = document.getElementsByClassName("chat__room-body--message-list")[0];
		if(elem){
			elem.scrollTop = elem.scrollHeight;
		}
	},[messages])

	console.log('ChatRoom me : ',me);
	console.log('ChatRoom socket : ', socket);
	console.log('ChatRoom messages : ', messages);
	console.log('ChatRoom messageInput : ',messageInput);
	console.log('ChatRoom randomNick : ', randomNick);
	console.log('ChatRoom chatUsers : ', chatUsers);
	console.log('MessageInptut : ', messageInput);
	
	const onKeyPressMessageInput = (e: any) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
		// const elem = document.getElementsByClassName("chat__room-body--message-list")[0];
		// elem.scrollTop = elem.scrollHeight;
	};

	const sendMessage = useCallback(() => {
		console.log('sendMessage Func')
		console.log(me)
		console.log('messageInput : ', messageInput);
		socket.emit('message', {
			type: 'chat',
			avatar: (me && me.avatar && me.avatar.src) || '/images/avatar.svg',
			nickname: (me && me.nickname) || randomNick,
			message: messageInput,
		});
		setMessageInput('');
	},[messageInput])
	const receiveMessage = useCallback(() => {
		console.log('receiveMessage Func');
		socket.on('message', (data: any) => {
			setMessages([...messages, data]);
		}); 
		console.log(elem);
		if(elem){
			console.log('auto scroll down')
			elem.scrollTop = elem.scrollHeight;
		}
	},[messages])

	const sendJoinUser = useCallback(() => {
		console.log('sendJoinUser Func');
		socket.emit('join', {
			type: 'join',
			socketId: socket.id,
			nickname: (me && me.nickname) || randomNick,
			avatar: (me && me.avatar && me.avatar.src) || '/images/avatar.svg',
		});
	}, []);
	const getJoinUser = useCallback(() => {
		console.log('getJoinUser Crrunt Messages : ', messages);
		socket.on('join', ({ data, chatUsers }: any) => {
			setMessages([...messages, data]);
			setChatUsers(chatUsers);
		});
	}, [messages, chatUsers]);

	const sendLeaveUser = useCallback(() => {
		socket.emit('leave', { type: 'leave',socketId: socket.id, nickname: (me && me.nickname) || randomNick });
	}, []);
	const getLeaveUser = useCallback(() => {
		socket.on('leave', ({ data, chatUsers }: any) => {
			console.log('leave chatUsers : ', chatUsers);
			setMessages([...messages, data]);
			setChatUsers(chatUsers);
		});
	},[messages, chatUsers]);
	const getDisconnectUser = useCallback(() => {
		socket.on('disconnectEvt', ({ disconnectedSocketId, chatUsers:resChatUsers}: any) => {
			console.log('disconnect-evt socket');
			console.log('disconnectedSocketId : ', disconnectedSocketId)
			console.log('disconnectEvt resChatUsers : ', resChatUsers)
			const disconnectedUser = chatUsers.find((user) => {
				return user.socketId === disconnectedSocketId;
			})
			console.log('disconnectedUser : ',disconnectedUser);
			console.log('disconnected Message : ', {
				...disconnectedUser,
				type:"disconnect"
			})
			setMessages([...messages, {
				...disconnectedUser,
				type:"disconnect"
			}])
			setChatUsers(resChatUsers);
		})
	},[chatUsers,messages])
	console.log('state chatusers : ', chatUsers);

	const onClickUserListIcon = () => {
		console.log('onClickUserListIcon');
		console.log(document.getElementsByClassName("chat__room-user-list")[0].setAttribute("style","width:250px;display:block;z-index:2;position:absolute;"));
		// document.getElementsByClassName("chat__room-user-list")[0].style.width = "250px";
	}
	
	const onClickCloseUserList = () => {
		console.log('onClickCloseUserList');
		document.getElementsByClassName("chat__room-user-list")[0].setAttribute("style","width:0")
	}
	return (
		<>
			<ChatRoomWrapper>
				<div className="chat__room-body">
					<div className="chat__room-body--title">
							<h2>React</h2>
							<img src="/icons/user-list.svg" width="39px" height="39px" onClick={onClickUserListIcon}/>
					</div>
					<div className="chat__room-body--message-list">
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
							} else if (type === 'leave' || type === 'disconnect') {
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
						<Button onClick={onClickCloseUserList} text={"X"}/>
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
