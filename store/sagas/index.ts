import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? "https://www.utopier-api.com":'http://localhost:2025';
console.log(axios.defaults.baseURL);
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([fork(postSaga), fork(userSaga)]);
}
