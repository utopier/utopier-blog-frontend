import React,{useEffect} from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store';

import { RootState } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, LOAD_USERS_REQUEST, SIGN_UP_REQUEST } from '../../store/reducers/user';
import { LOAD_POSTS_REQUEST } from '../../store/reducers/post';

import styled from '@emotion/styled';
import Button from '../../components/Common/Button';
import FormikField from '../../components/Common/FormikField';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';


const SignUpWarrper = styled.div`
	display:flex;	
	flex-direction: column;
	padding: 3rem;
	.body__signup--title{
		display: flex;
		justify-content: center;
		font-size: 2rem;
		padding-bottom: 3rem;
		font-weight: 700;
		color: #00818a;
		border-bottom: 1px solid #404b69;
	}	
	.body__signup--form-warpper{
		padding-top: 3rem;
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
`;

const SignUp = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const dispatch = useDispatch();
	const { signUpDone, signUpLoading, signUpError, me } = useSelector<RootState, any>((state) => state.user);

	console.log('signUpLoading : ',signUpLoading)

    useEffect(() => {
		if (me && me.id) {
			Router.replace('/');
		}
	}, [me && me.id]);

	useEffect(() => {
		if (signUpDone) {
			Router.replace('/login');
		}
	}, [signUpDone]);

	useEffect(() => {
		if (signUpError) {
			alert(signUpError);
			console.log(signUpError)
		}
	}, [signUpError]);

	const onSubmitSignUpForm = (values) => {
		const { email, nickname, password } = values;
		dispatch({
			type: SIGN_UP_REQUEST,
			data: { email, password, nickname },
		});
	};


    return (
		<>
			<Head>
				<title>Utoiper - SignUp</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
			</Head>
			<SignUpWarrper className="body__signup--wrapper">
				<div className="body__signup--title">
					<h2>SignUp</h2>
				</div>
				<div className="body__signup--form-warpper">
					<Formik
						initialValues={{ email: '', nickname: '', password: '', confirmPassword: '' }}
						validationSchema={Yup.object({
							email: Yup.string().email('Invalid email address').required('Required'),
							nickname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
							password: Yup.string()
								.matches(
									/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
									'8자 이상, 숫자/대문자/소문자/특수문자를 모두 포함.'
								)
								.required('Required'),
							confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
						})}
						onSubmit={onSubmitSignUpForm}
					>
						<Form>
							<FormikField htmlFor="email" labelText="Email" type="text" />
							<FormikField htmlFor="nickname" labelText="Nickname" type="text" />
							<FormikField htmlFor="password" labelText="Password" type="password" />
							<FormikField htmlFor="confirmPassword" labelText="Confirm Password" type="password" />
							<Button type="submit" text="Submit" width="150px" height="40px" />
						</Form>
					</Formik>
				</div>
			</SignUpWarrper>
		</>
    )
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	// context.store.dispatch({
	// 	type: LOAD_USERS_REQUEST,
	// });
	// context.store.dispatch({
	// 	type: LOAD_POSTS_REQUEST,
	// });
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});


export default SignUp;