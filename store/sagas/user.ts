import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
	CHANGE_NICKNAME_FAILURE,
	CHANGE_NICKNAME_REQUEST,
	CHANGE_NICKNAME_SUCCESS,
	CHANGE_BIO_REQUEST,
	CHANGE_BIO_SUCCESS,
	CHANGE_BIO_FAILURE,
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	LOAD_FOLLOWERS_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_SUCCESS,
	LOAD_FOLLOWINGS_FAILURE,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_SUCCESS,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_USER_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USERS_FAILURE,
	LOAD_USERS_REQUEST,
	LOAD_USERS_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	REMOVE_FOLLOWER_FAILURE,
	REMOVE_FOLLOWER_REQUEST,
	REMOVE_FOLLOWER_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	UPLOAD_IMAGES_REQUEST,
	UPLOAD_IMAGES_SUCCESS,
	UPLOAD_IMAGES_FAILURE,
	REMOVE_IMAGES_REQUEST,
	REMOVE_IMAGES_SUCCESS,
	REMOVE_IMAGES_FAILURE,
	UNFOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	LOAD_MY_INFO_FAILURE,
} from '../reducers/user';
import { UserAction } from '../reducers/user';

function removeFollowerAPI(data: any) {
	return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action: UserAction) {
	try {
		const result = yield call(removeFollowerAPI, action.data);
		yield put({
			type: REMOVE_FOLLOWER_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REMOVE_FOLLOWER_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function loadFollowersAPI(data: any) {
	return axios.get('/user/followers', data);
}

function* loadFollowers(action: UserAction) {
	try {
		const result = yield call(loadFollowersAPI, action.data);
		yield put({
			type: LOAD_FOLLOWERS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_FOLLOWERS_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function loadFollowingsAPI(data: any) {
	return axios.get('/user/followings', data);
}

function* loadFollowings(action: UserAction) {
	try {
		const result = yield call(loadFollowingsAPI, action.data);
		yield put({
			type: LOAD_FOLLOWINGS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_FOLLOWINGS_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function changeNicknameAPI(data: any) {
	return axios.patch('/user/nickname', data);
}

function* changeNickname(action: UserAction) {
	try {
		const result = yield call(changeNicknameAPI, action.data);
		yield put({
			type: CHANGE_NICKNAME_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: CHANGE_NICKNAME_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function changeBioAPI(data: any) {
	return axios.patch('/user/bio', data);
}

function* changeBio(action: UserAction) {
	try {
		const result = yield call(changeBioAPI, action.data);
		yield put({
			type: CHANGE_BIO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: CHANGE_BIO_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function loadUserAPI(data: any) {
	return axios.get(`/user/${data}`);
}

function* loadUser(action: UserAction) {
	try {
		const result = yield call(loadUserAPI, action.data);
		console.log('loadUserData', result.data);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_USER_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function loadUsersAPI(data: any) {
	const isSearch = data ? !!data.searchQuery : null;
	return isSearch
		? axios.get(
				`/users/search?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
					(data && data.orderBy) || 0
				}&popular=${(data && data.popular) || 0}`
		  )
		: axios.get(
				`/users?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
					(data && data.orderBy) || 0
				}&popular=${(data && data.popular) || 0}`
		  );
}

function* loadsUser(action: UserAction) {
	try {
		const result = yield call(loadUsersAPI, action.data);
		console.log('loadsUserData', result.data);
		yield put({
			type: LOAD_USERS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_USERS_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function loadMyInfoAPI() {
	return axios.get('/user');
}

function* loadMyInfo() {
	try {
		const result = yield call(loadMyInfoAPI);
		console.log('result : ', result);
		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error('loadMyInfo Error : ',err);
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function logInAPI(data: any) {
	return axios.post('/user/login', data);
}

function* logIn(action: UserAction) {
	try {
		const result = yield call(logInAPI, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOG_IN_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function logOutAPI() {
	return axios.post('/user/logout');
}

function* logOut() {
	try {
		yield call(logOutAPI);
		yield put({
			type: LOG_OUT_SUCCESS,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOG_OUT_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function signUpAPI(data: any) {
	console.log('signUpApI data:', data);
	return axios.post('/user', data);
}

function* signUp(action: UserAction) {
	console.log('signUp action:', action);
	try {
		const result = yield call(signUpAPI, action.data);
		console.log(result);
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SIGN_UP_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function uploadImagesAPI(data: any) {
	return axios.post('/user/images', data);
}

function* uploadImages(action: UserAction) {
	console.log(action);
	try {
		const result = yield call(uploadImagesAPI, action.data);
		yield put({
			type: UPLOAD_IMAGES_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UPLOAD_IMAGES_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function removeImagesAPI(data: any) {
	return axios.delete(`/user/images?imgPath=${data.imgPath}`);
}

function* removeImages(action: any) {
	console.log(action);
	try {
		const result = yield call(removeImagesAPI, action.data);
		yield put({
			type: REMOVE_IMAGES_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REMOVE_IMAGES_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function followAPI(data: any) {
	return axios.patch(`/user/${data}/follow`);
}

function* follow(action: UserAction) {
	try {
		console.log('followFunc action.data', action.data);
		const result = yield call(followAPI, action.data);
		console.log('result : ', result);
		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function unfollowAPI(data: any) {
	return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action: UserAction) {
	try {
		const result = yield call(unfollowAPI, action.data);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UNFOLLOW_FAILURE,
			error: err.response ? err.response.data : JSON.stringify(err),
		});
	}
}

function* watchRemoveFollower() {
	yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers() {
	yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
	yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchChangeNickname() {
	yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchChangeBio() {
	yield takeLatest(CHANGE_BIO_REQUEST, changeBio);
}

function* watchLoadUser() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadUsers() {
	yield takeLatest(LOAD_USERS_REQUEST, loadsUser);
}

function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchUploadImages() {
	yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRemoveImages() {
	yield takeLatest(REMOVE_IMAGES_REQUEST, removeImages);
}

export default function* userSaga() {
	yield all([
		fork(watchRemoveFollower),
		fork(watchLoadFollowers),
		fork(watchLoadFollowings),
		fork(watchChangeNickname),
		fork(watchLoadUser),
		fork(watchLoadUsers),
		fork(watchLoadMyInfo),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchUploadImages),
		fork(watchRemoveImages),
		fork(watchChangeBio),
	]);
}
