import SubNav from '../../components/SubNav';
import PostList from '../../components/PostList';

import { useEffect } from 'react';
import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { LOAD_POSTS_REQUEST } from '../../store/reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';

import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST, LOAD_USERS_REQUEST } from '../../store/reducers/user';
import wrapper from '../../store';

// robots.txt
// sitemap.xml

// next/head
// - title
// - description metaTag
// - viewport
// - 소셜 미디어 태그
// 	- Open Graph 태그
// 	- 트위터 카드 태그

// 키워드 및 컨텐츠 최적화
// - 웹사이트 콘텐츠, 타이블, 메타디스크립션 태그, 이미지 alt태그, URL 이름

// schema

// amp

// SSR
// 	- getServerSideProps

const Posts = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	console.log('router.query.searchTerm : ',router.query.searchTerm);
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector<RootState, any>((state) => state.post);
	const dispatch = useDispatch();
	useEffect(() => {
		function onScroll() {
			if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				if (hasMorePosts && !loadPostsLoading) {
					dispatch({
						type: LOAD_POSTS_REQUEST,
						data: { lastId: mainPosts.length },
					});
				}
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostsLoading, mainPosts]);
	return (
		<>
			<Head>
				<title>Utoiper - Posts</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="This is an example of a meta description. This will often show up in search results."
				/>
			</Head>
			<SubNav />
			<PostList postData={mainPosts} />
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
		type: LOAD_USERS_REQUEST,
	});
	if(context.req.__NEXT_INIT_QUERY.searchTerm){
		context.store.dispatch({
			type: LOAD_POSTS_REQUEST,
			data: {searchQuery: context.req.__NEXT_INIT_QUERY.searchTerm}
		});
	} else {
		context.store.dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}
	console.log('getSearverSIdeProps context.req.__NEXT_INIT_QUERY.searchTerm : ', context.req.__NEXT_INIT_QUERY.searchTerm);
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Posts;
