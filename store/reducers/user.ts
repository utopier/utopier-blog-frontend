import produce from 'immer';

// 액션 type
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST' as const;
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS' as const;
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE' as const;

export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST' as const;
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS' as const;
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE' as const;

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const;
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const;
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const;

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const;
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const;
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const;

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const;
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const;
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const;

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const;

export const REMOVE_IMAGES_REQUEST = 'REMOVE_IMAGES_REQUEST' as const;
export const REMOVE_IMAGES_SUCCESS = 'REMOVE_IMAGES_SUCCESS' as const;
export const REMOVE_IMAGES_FAILURE = 'REMOVE_IMAGES_FAILURE' as const;

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST' as const;
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS' as const;
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE' as const;

export const CHANGE_BIO_REQUEST = 'CHANGE_BIO_REQUEST' as const;
export const CHANGE_BIO_SUCCESS = 'CHANGE_BIO_SUCCESS' as const;
export const CHANGE_BIO_FAILURE = 'CHANGE_BIO_FAILURE' as const;

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST' as const;
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS' as const;
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE' as const;

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST' as const;
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS' as const;
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE' as const;

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST' as const;
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS' as const;
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE' as const;

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST' as const;
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS' as const;
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE' as const;

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST' as const;
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS' as const;
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE' as const;

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME' as const;
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME' as const;

export const ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM' as const;
export const REMOVE_USER_TO_ROOM = 'REMOVE_USER_TO_ROOM' as const;

// 액션 생성 함수
export const loadMyInfoRequest = (data: object) => ({
	type: LOAD_MY_INFO_REQUEST,
	data,
});
export const loadMyInfoSuccess = (data: object) => ({
	type: LOAD_MY_INFO_SUCCESS,
	data,
});
export const loadMyInfoFailure = (data: object) => ({
	type: LOAD_MY_INFO_FAILURE,
	data,
});

export const loadUserRequest = (data: object) => ({
	type: LOAD_USER_REQUEST,
	data,
});
export const loadUserSuccess = (data: object) => ({
	type: LOAD_USER_SUCCESS,
	data,
});
export const loadUserFailure = (data: object) => ({
	type: LOAD_USER_FAILURE,
	data,
});

export const loadUsersRequest = (data: object) => ({
	type: LOAD_USERS_REQUEST,
	data,
});
export const loadUsersSuccess = (data: object) => ({
	type: LOAD_USERS_SUCCESS,
	data,
});
export const loadUsersFailure = (data: object) => ({
	type: LOAD_USERS_FAILURE,
	data,
});

export const loginRequest = (data: object) => ({
	type: LOG_IN_REQUEST,
	data,
});
export const loginSuccess = (data: object) => ({
	type: LOG_IN_SUCCESS,
	data,
});
export const loginFailure = (data: object) => ({
	type: LOG_IN_FAILURE,
	data,
});

export const logoutRequest = (data: object) => ({
	type: LOG_OUT_REQUEST,
	data,
});
export const logoutSuccess = (data: object) => ({
	type: LOG_OUT_SUCCESS,
	data,
});
export const logoutFailure = (data: object) => ({
	type: LOG_OUT_FAILURE,
	data,
});

export const signupRequest = (data: object) => ({
	type: SIGN_UP_REQUEST,
	data,
});
export const signupSuccess = (data: object) => ({
	type: SIGN_UP_SUCCESS,
	data,
});
export const signupFailure = (data: object) => ({
	type: SIGN_UP_FAILURE,
	data,
});

export const uploadImagesRequest = (id: number) => ({
	type: UPLOAD_IMAGES_REQUEST,
	data: id,
});
export const uploadImagesSuccess = (id: number) => ({
	type: UPLOAD_IMAGES_SUCCESS,
	data: id,
});
export const uploadImagesFailure = (id: number) => ({
	type: UPLOAD_IMAGES_FAILURE,
	data: id,
});

export const removeImagesRequest = (id: number) => ({
	type: REMOVE_IMAGES_REQUEST,
	data: id,
});
export const removeImagesSuccess = (id: number) => ({
	type: REMOVE_IMAGES_SUCCESS,
	data: id,
});
export const removeImagesFailure = (id: number) => ({
	type: REMOVE_IMAGES_FAILURE,
	data: id,
});

export const changeNicknameRequest = (data: object) => ({
	type: CHANGE_NICKNAME_REQUEST,
	data,
});
export const changeNicknameSuccess = (data: object) => ({
	type: CHANGE_NICKNAME_SUCCESS,
	data,
});
export const changeNicknameFailure = (data: object) => ({
	type: CHANGE_NICKNAME_FAILURE,
	data,
});

export const changeBioRequest = (data: object) => ({
	type: CHANGE_BIO_REQUEST,
	data,
});
export const changeBioSuccess = (data: object) => ({
	type: CHANGE_BIO_SUCCESS,
	data,
});
export const changeBioFailure = (data: object) => ({
	type: CHANGE_BIO_FAILURE,
	data,
});

export const followRequest = (data: object) => ({
	type: FOLLOW_REQUEST,
	data,
});
export const followSuccess = (data: object) => ({
	type: FOLLOW_SUCCESS,
	data,
});
export const followFailure = (data: object) => ({
	type: FOLLOW_FAILURE,
	data,
});

export const unfollowRequest = (data: object) => ({
	type: UNFOLLOW_REQUEST,
	data,
});
export const unfollowSuccess = (data: object) => ({
	type: UNFOLLOW_SUCCESS,
	data,
});
export const unfollowFailure = (data: object) => ({
	type: UNFOLLOW_FAILURE,
	data,
});

export const removeFollowerRequest = (data: object) => ({
	type: REMOVE_FOLLOWER_REQUEST,
	data,
});
export const removeFollowerSuccess = (data: object) => ({
	type: REMOVE_FOLLOWER_SUCCESS,
	data,
});
export const removeFollowerFailure = (data: object) => ({
	type: REMOVE_FOLLOWER_FAILURE,
	data,
});

export const loadFollowingsRequest = (data: object) => ({
	type: LOAD_FOLLOWINGS_REQUEST,
	data,
});
export const loadFollowingsSuccess = (data: object) => ({
	type: LOAD_FOLLOWINGS_SUCCESS,
	data,
});
export const loadFollowingsFailure = (data: object) => ({
	type: LOAD_FOLLOWINGS_FAILURE,
	data,
});

export const loadFollowersRequest = (data: object) => ({
	type: LOAD_FOLLOWERS_REQUEST,
	data,
});
export const loadFollowersSuccess = (data: object) => ({
	type: LOAD_FOLLOWERS_SUCCESS,
	data,
});
export const loadFollowersFailure = (data: object) => ({
	type: LOAD_FOLLOWERS_FAILURE,
	data,
});

export const addPostToMe = (data: object) => ({
	type: ADD_POST_TO_ME,
	data,
});

export const removePostOfMe = (data: object) => ({
	type: REMOVE_POST_OF_ME,
	data,
});

export const addUserToRoom = (data: object) => ({
	type: ADD_USER_TO_ROOM,
	data,
});

export const removeUserToRoom = (data: object) => ({
	type: REMOVE_USER_TO_ROOM,
	data,
});

// 액션 타입스크립트 타입
export type UserAction =
	| ReturnType<typeof loadMyInfoRequest>
	| ReturnType<typeof loadMyInfoSuccess>
	| ReturnType<typeof loadMyInfoFailure>
	| ReturnType<typeof loadUserRequest>
	| ReturnType<typeof loadUserSuccess>
	| ReturnType<typeof loadUserFailure>
	| ReturnType<typeof loadUsersRequest>
	| ReturnType<typeof loadUsersSuccess>
	| ReturnType<typeof loadUsersFailure>
	| ReturnType<typeof loginRequest>
	| ReturnType<typeof loginSuccess>
	| ReturnType<typeof loginFailure>
	| ReturnType<typeof logoutRequest>
	| ReturnType<typeof logoutSuccess>
	| ReturnType<typeof logoutFailure>
	| ReturnType<typeof signupRequest>
	| ReturnType<typeof signupSuccess>
	| ReturnType<typeof signupFailure>
	| ReturnType<typeof uploadImagesRequest>
	| ReturnType<typeof uploadImagesSuccess>
	| ReturnType<typeof uploadImagesFailure>
	| ReturnType<typeof removeImagesRequest>
	| ReturnType<typeof removeImagesSuccess>
	| ReturnType<typeof removeImagesFailure>
	| ReturnType<typeof changeNicknameRequest>
	| ReturnType<typeof changeNicknameSuccess>
	| ReturnType<typeof changeNicknameFailure>
	| ReturnType<typeof changeBioRequest>
	| ReturnType<typeof changeBioSuccess>
	| ReturnType<typeof changeBioFailure>
	| ReturnType<typeof followRequest>
	| ReturnType<typeof followSuccess>
	| ReturnType<typeof followFailure>
	| ReturnType<typeof unfollowRequest>
	| ReturnType<typeof unfollowSuccess>
	| ReturnType<typeof unfollowFailure>
	| ReturnType<typeof removeFollowerRequest>
	| ReturnType<typeof removeFollowerSuccess>
	| ReturnType<typeof removeFollowerFailure>
	| ReturnType<typeof loadFollowingsRequest>
	| ReturnType<typeof loadFollowingsSuccess>
	| ReturnType<typeof loadFollowingsFailure>
	| ReturnType<typeof loadFollowersRequest>
	| ReturnType<typeof loadFollowersSuccess>
	| ReturnType<typeof loadFollowersFailure>
	| ReturnType<typeof addPostToMe>
	| ReturnType<typeof removePostOfMe>
	| ReturnType<typeof addUserToRoom>
	| ReturnType<typeof removeUserToRoom>;

// 상태를 위한 타입 선언

export type UserState = {
	hasMoreUsers: boolean;
	loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
	loadMyInfoDone: boolean;
	loadMyInfoError: null | string;
	loadUserLoading: boolean; // 유저 정보 가져오기 시도중
	loadUserDone: boolean;
	loadUserError: null | string;
	loadUsersLoading: boolean; // 유저 목록 가져오기 시도중
	loadUsersDone: boolean;
	loadUsersError: null | string;
	followLoading: boolean; // 팔로우 시도중
	followDone: boolean;
	followError: null | string;
	unfollowLoading: boolean; // 언팔로우 시도중
	unfollowDone: boolean;
	unfollowError: null | string;
	logInLoading: boolean; // 로그인 시도중
	logInDone: boolean;
	logInError: null | string;
	logOutLoading: boolean; // 로그아웃 시도중
	logOutDone: boolean;
	logOutError: null | string;
	signUpLoading: boolean; // 회원가입 시도중
	signUpDone: boolean;
	signUpError: null | string;
	uploadImagesLoading: boolean;
	uploadImagesDone: boolean;
	uploadImagesError: null | string;
	removeImagesLoading: boolean;
	removeImagesDone: boolean;
	removeImagesError: null | string;
	changeNicknameLoading: boolean; // 닉네임 변경 시도중
	changeNicknameDone: boolean;
	changeNicknameError: null | string;
	changeBioLoading: boolean; // 닉네임 변경 시도중
	changeBioDone: boolean;
	changeBioError: null | string;
	loadFollowingsLoading: boolean;
	loadFollowingsDone: boolean;
	loadFollowingsError: null | string;
	loadFollowersLoading: boolean;
	loadFollowersDone: boolean;
	loadFollowersError: null | string;
	removeFollowerLoading: boolean;
	removeFollowerDone: boolean;
	removeFollowerError: null | string;
	me: null | any;
	userInfo: null | any;
	usersInfo: any;
	allUsersCount: string;
	searchedUsersCount: string;
	createAvatarImg: any;
	chatUsers: any;
};

// 초깃값

const initialState: UserState = {
	hasMoreUsers: true,
	loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
	loadMyInfoDone: false,
	loadMyInfoError: null,
	loadUserLoading: false, // 유저 정보 가져오기 시도중
	loadUserDone: false,
	loadUserError: null,
	loadUsersLoading: false, // 유저 목록 가져오기 시도중
	loadUsersDone: false,
	loadUsersError: null,
	followLoading: false, // 팔로우 시도중
	followDone: false,
	followError: null,
	unfollowLoading: false, // 언팔로우 시도중
	unfollowDone: false,
	unfollowError: null,
	logInLoading: false, // 로그인 시도중
	logInDone: false,
	logInError: null,
	logOutLoading: false, // 로그아웃 시도중
	logOutDone: false,
	logOutError: null,
	signUpLoading: false, // 회원가입 시도중
	signUpDone: false,
	signUpError: null,
	uploadImagesLoading: false,
	uploadImagesDone: false,
	uploadImagesError: null,
	removeImagesLoading: false,
	removeImagesDone: false,
	removeImagesError: null,
	changeNicknameLoading: false, // 닉네임 변경 시도중
	changeNicknameDone: false,
	changeNicknameError: null,
	changeBioLoading: false, // 닉네임 변경 시도중
	changeBioDone: false,
	changeBioError: null,
	loadFollowingsLoading: false,
	loadFollowingsDone: false,
	loadFollowingsError: null,
	loadFollowersLoading: false,
	loadFollowersDone: false,
	loadFollowersError: null,
	removeFollowerLoading: false,
	removeFollowerDone: false,
	removeFollowerError: null,
	me: null,
	userInfo: null,
	usersInfo: null,
	allUsersCount: '',
	searchedUsersCount: '',
	createAvatarImg: null,
	chatUsers: [],
};

// 리듀서
const reducer = (state: UserState = initialState, action: any): UserState =>
	produce(state, (draft) => {
		switch (action.type) {
			case REMOVE_FOLLOWER_REQUEST:
				draft.removeFollowerLoading = true;
				draft.removeFollowerError = null;
				draft.removeFollowerDone = false;
				break;
			case REMOVE_FOLLOWER_SUCCESS:
				draft.removeFollowerLoading = false;
				draft.me.followers = draft.me.followers.filter((v) => v.id !== action.data.UserId);
				draft.removeFollowerDone = true;
				break;
			case REMOVE_FOLLOWER_FAILURE:
				draft.removeFollowerLoading = false;
				draft.removeFollowerError = action.error;
				break;
			case LOAD_FOLLOWINGS_REQUEST:
				draft.loadFollowingsLoading = true;
				draft.loadFollowingsError = null;
				draft.loadFollowingsDone = false;
				break;
			case LOAD_FOLLOWINGS_SUCCESS:
				draft.loadFollowingsLoading = false;
				draft.me.followings = action.data;
				draft.loadFollowingsDone = true;
				break;
			case LOAD_FOLLOWINGS_FAILURE:
				draft.loadFollowingsLoading = false;
				draft.loadFollowingsError = action.error;
				break;
			case LOAD_FOLLOWERS_REQUEST:
				draft.loadFollowersLoading = true;
				draft.loadFollowersError = null;
				draft.loadFollowersDone = false;
				break;
			case LOAD_FOLLOWERS_SUCCESS:
				draft.loadFollowersLoading = false;
				draft.me.followers = action.data;
				draft.loadFollowersDone = true;
				break;
			case LOAD_FOLLOWERS_FAILURE:
				draft.loadFollowersLoading = false;
				draft.loadFollowersError = action.error;
				break;
			case LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLoading = true;
				draft.loadMyInfoError = null;
				draft.loadMyInfoDone = false;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.loadMyInfoLoading = false;
				draft.me = action.data;
				draft.loadMyInfoDone = true;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoError = action.error;
				break;
			case LOAD_USER_REQUEST:
				draft.loadUserLoading = true;
				draft.loadUserError = null;
				draft.loadUserDone = false;
				break;
			case LOAD_USER_SUCCESS:
				draft.loadUserLoading = false;
				draft.userInfo = action.data;
				draft.loadUserDone = true;
				break;
			case LOAD_USER_FAILURE:
				draft.loadUserLoading = false;
				draft.loadUserError = action.error;
				break;
			case LOAD_USERS_REQUEST:
				draft.loadUserLoading = true;
				draft.loadUserError = null;
				draft.loadUserDone = false;
				break;
			case LOAD_USERS_SUCCESS:
				draft.loadUserLoading = false;
				if (action.data.filtering && !action.data.skipNum) {
					draft.usersInfo = action.data.users;
					if (action.data.searchedUsersCount) {
						draft.searchedUsersCount = action.data.searchedUsersCount;
					}
					if (action.data.usersCount) {
						draft.allUsersCount = action.data.usersCount;
					}
				} else if (action.data.skipNum >= 10) {
					draft.usersInfo = draft.usersInfo.concat(action.data.users);
				}
				draft.hasMoreUsers = action.data.users.length === 10;
				draft.loadUserDone = true;
				break;
			case LOAD_USERS_FAILURE:
				draft.loadUserLoading = false;
				draft.loadUserError = action.error;
				break;
			case FOLLOW_REQUEST:
				draft.followLoading = true;
				draft.followError = null;
				draft.followDone = false;
				break;
			case FOLLOW_SUCCESS:
				draft.followLoading = false;
				draft.me.followings.push({ id: action.data.UserId });
				draft.followDone = true;
				break;
			case FOLLOW_FAILURE:
				draft.followLoading = false;
				draft.followError = action.error;
				break;
			case UNFOLLOW_REQUEST:
				draft.unfollowLoading = true;
				draft.unfollowError = null;
				draft.unfollowDone = false;
				break;
			case UNFOLLOW_SUCCESS:
				draft.unfollowLoading = false;
				draft.me.followings = draft.me.followings.filter((v) => v.id !== action.data.UserId);
				draft.unfollowDone = true;
				break;
			case UNFOLLOW_FAILURE:
				draft.unfollowLoading = false;
				draft.unfollowError = action.error;
				break;
			case LOG_IN_REQUEST:
				draft.logInLoading = true;
				draft.logInError = null;
				draft.logInDone = false;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLoading = false;
				draft.me = action.data;
				draft.logInDone = true;
				break;
			case LOG_IN_FAILURE:
				draft.logInLoading = false;
				draft.logInError = action.error;
				break;
			case LOG_OUT_REQUEST:
				draft.logOutLoading = true;
				draft.logOutError = null;
				draft.logOutDone = false;
				break;
			case LOG_OUT_SUCCESS:
				draft.logOutLoading = false;
				draft.logOutDone = true;
				draft.me = null;
				break;
			case LOG_OUT_FAILURE:
				draft.logOutLoading = false;
				draft.logOutError = action.error;
				break;
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpError = null;
				draft.signUpDone = false;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;
			case UPLOAD_IMAGES_REQUEST:
				draft.uploadImagesLoading = true;
				draft.uploadImagesDone = false;
				draft.uploadImagesError = null;
				break;
			case UPLOAD_IMAGES_SUCCESS:
				draft.createAvatarImg = action.data;
				draft.uploadImagesLoading = false;
				draft.uploadImagesDone = true;
				break;
			case UPLOAD_IMAGES_FAILURE:
				draft.uploadImagesLoading = false;
				draft.uploadImagesError = action.error;
				break;
			case REMOVE_IMAGES_REQUEST:
				draft.removeImagesLoading = true;
				draft.removeImagesDone = false;
				draft.removeImagesError = null;
				break;
			case REMOVE_IMAGES_SUCCESS:
				draft.createAvatarImg = '';
				draft.me.src = '';
				draft.removeImagesLoading = false;
				draft.removeImagesDone = true;
				break;
			case REMOVE_IMAGES_FAILURE:
				draft.removeImagesLoading = false;
				draft.removeImagesError = action.error;
				break;
			case CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLoading = true;
				draft.changeNicknameError = null;
				draft.changeNicknameDone = false;
				break;
			case CHANGE_NICKNAME_SUCCESS:
				console.log('change nickname success : ', action.data);
				draft.me.nickname = action.data.nickname;
				draft.changeNicknameLoading = false;
				draft.changeNicknameDone = true;
				break;
			case CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLoading = false;
				draft.changeNicknameError = action.error;
				break;
			case CHANGE_BIO_REQUEST:
				draft.changeBioLoading = true;
				draft.changeBioError = null;
				draft.changeBioDone = false;
				break;
			case CHANGE_BIO_SUCCESS:
				draft.me.bio = action.data.bio;
				draft.changeBioLoading = false;
				draft.changeBioDone = true;
				break;
			case CHANGE_BIO_FAILURE:
				draft.changeBioLoading = false;
				draft.changeBioError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.me.Posts.unshift({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				console.log('REMOVE_POST_OF_ME', action);
				draft.me.posts = draft.me.posts.filter((v) => v.id !== action.data);
				break;
			default:
				break;
		}
	});

export default reducer;
