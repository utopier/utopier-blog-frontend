import Profile from '../../components/Profile';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';

import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store';

import { LOAD_USER_REQUEST, LOAD_MY_INFO_REQUEST } from '../../store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
const UserProfile = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { userId } = router.query;
	const { me, userInfo } = useSelector<RootState, any>((state) => state.user);

	return (
		<>
			<Head>
				<title>Utoiper - Profile</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
			</Head>
			<h1>UserProfile</h1>
			<h2>userId : {userId}</h2>
			<Profile userData={userInfo} />
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
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
		data: context.params.userId,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});
export default UserProfile;
