import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? "http://ec2-13-124-80-203.ap-northeast-2.compute.amazonaws.com:2025":'http://localhost:2025';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([fork(postSaga), fork(userSaga)]);
}
