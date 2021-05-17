import React,{useState, useEffect} from 'react';
import {Router} from 'next/router'
import { css } from '@emotion/core';

import {useSelector} from 'react-redux';
import { RootState } from '../../store/reducers';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
	display:block;
	position: fixed;
	z-index: 10;
`;


const LoadingBar = () => {
	const [routeChanged, setRouteChanged] = useState(false);
	useEffect(() => {
		Router.events.on('routeChangeStart', () => setRouteChanged(true));
    	Router.events.on('routeChangeComplete', () => setRouteChanged(false));
	})
	const {
		loadMyInfoLoading,
		loadUserLoading,
		loadUsersLoading,
		followLoading,
		unfollowLoading,
		logInLoading,
		logOutLoading,
		signUpLoading,
		uploadImagesLoading,
		removeImagesLoading,
		changeNicknameLoading,
		changeBioLoading,
		loadFollowingsLoading,
		loadFollowersLoading,
		removeFollowerLoading,
	} = useSelector<RootState, any>((state) => state.user);
	const {
		likePostLoading,
		unlikePostLoading,
		loadPostLoading,
		loadPostsLoading,
		loadTagsLoading,
		addPostLoading,
		updatePostLoading,
		removePostLoading,
		addCommentLoading,
		updateCommentLoading,
		removeCommentLoading,
		postUploadImagesLoading,
		postRemoveImagesLoading,
	} = useSelector<RootState, any>((state) => state.post);
	const isLoading =
		routeChanged ||
		loadMyInfoLoading ||
		loadUserLoading ||
		loadUsersLoading ||
		followLoading ||
		unfollowLoading ||
		logInLoading ||
		logOutLoading ||
		signUpLoading ||
		uploadImagesLoading ||
		removeImagesLoading ||
		changeNicknameLoading ||
		changeBioLoading ||
		loadFollowersLoading ||
		loadFollowingsLoading ||
		removeFollowerLoading ||
		likePostLoading ||
		unlikePostLoading ||
		loadPostLoading ||
		loadPostsLoading ||
		loadTagsLoading ||
		addPostLoading ||
		updatePostLoading ||
		removePostLoading ||
		addCommentLoading ||
		updateCommentLoading ||
		removePostLoading ||
		postUploadImagesLoading ||
		postRemoveImagesLoading ||
		removeCommentLoading;

        return(
            <>
				<BarLoader css={override} width={4000} height={10} color={'#00818a'} loading={isLoading} />
            </>
        )
}

export default LoadingBar;