import React, { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Router from 'next/router';

import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store';
import { LOAD_MY_INFO_REQUEST } from '../../store/reducers/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

import Profile from '../../components/Profile';

const MyProfile = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { me } = useSelector<RootState, any>((state) => state.user);

	useEffect(() => {
		if (!(me && me.id)) {
			Router.push('/');
		}
	}, [me && me.id]);

	return (
		<>
			<Head>
				<title>Utoiper - MyProfile</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
			</Head>
			<h1>MyProfile</h1>
			<Profile userData={me} />
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
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default MyProfile;
