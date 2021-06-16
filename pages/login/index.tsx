import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { END } from 'redux-saga';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Common/Button';
import FormikField from '../../components/Common/FormikField';
import wrapper from '../../store';
import { RootState } from '../../store/reducers';
import { LOG_IN_REQUEST, LOAD_MY_INFO_REQUEST } from '../../store/reducers/user';

const LoginWrapper = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	.body__login--title {
		width: 40vw;
		height: 15vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.body__login--title h2 {
		width: 100%;
		font-size: 2rem;
		color: #00818a;
		font-weight: 700;
		border-bottom: 1px solid #404b69;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 20px;
	}
	.body__login--form-warpper {
		width: 100%;
		form {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
`;

const LoginForm = () => {
	const dispatch = useDispatch();
	const { logInDone, logInError, me } = useSelector<RootState, any>((state) => state.user);

	useEffect(() => {
		if (me && me.id) {
			Router.replace('/posts');
		}
	}, [me && me.id]);

	useEffect(() => {
		if (logInDone) {
			Router.replace('/posts');
		}
	}, [logInDone]);
	useEffect(() => {
		if (logInError) {
			alert(logInError);
		}
	}, [logInError]);

	const onSubmitLoginForm = (values) => {
		const { email, password } = values;
		dispatch({ type: LOG_IN_REQUEST, data: { email, password } });
	};
	return (
		<>
			<Head>
				<title>Utoiper - Login</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
			</Head>
			<LoginWrapper className="body__login--wrapper">
				<div className="body__login--title">
					<h2>Login</h2>
				</div>
				<div className="body__login--form-warpper">
					<Formik
						initialValues={{ email: '', nickname: '', password: '', confirmPassword: '' }}
						validationSchema={Yup.object({
							email: Yup.string().email('Invalid email address').required('Required'),
							password: Yup.string()
								.matches(
									/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
									'비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.'
								)
								.required('Required'),
						})}
						onSubmit={onSubmitLoginForm}
					>
						<Form>
							<FormikField htmlFor="email" labelText="Email" type="text" />

							<FormikField htmlFor="password" labelText="Password" type="password" />

							<Button type="submit" text="Submit" width="150px" height="40px" />
						</Form>
					</Formik>
				</div>
			</LoginWrapper>
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

export default LoginForm;
