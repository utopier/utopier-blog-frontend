import UserList from '../../components/UserList';
import SubNav from '../../components/SubNav';

import React, { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { LOAD_MY_INFO_REQUEST, LOAD_USERS_REQUEST } from '../../store/reducers/user';

import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store';

const Users = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { loadUsersLoading, loadUsersError, usersInfo, hasMoreUsers } = useSelector<RootState, any>(
		(state) => state.user
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loadUsersError) {
			alert(loadUsersError);
		}
	}, [loadUsersError]);
	useEffect(() => {
		function onScroll() {
			if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				if (hasMoreUsers && !loadUsersLoading) {
					dispatch({
						type: LOAD_USERS_REQUEST,
						data: { lastId: usersInfo.length },
					});
				}
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMoreUsers, loadUsersLoading, usersInfo]);

	console.log('usersInfo : ',usersInfo);
	return (
		<>
			<SubNav />
			<UserList userData={usersInfo} />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	if(context.req.__NEXT_INIT_QUERY.searchTerm){
		context.store.dispatch({
			type: LOAD_USERS_REQUEST,
			data: {searchQuery: context.req.__NEXT_INIT_QUERY.searchTerm}
		});
	} else {
		context.store.dispatch({
			type: LOAD_USERS_REQUEST,
		});
	}
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Users;
