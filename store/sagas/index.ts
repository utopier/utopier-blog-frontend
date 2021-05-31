import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? "https://lwdc6kzck0.execute-api.ap-northeast-2.amazonaws.com":'http://localhost:2025';
// axios.defaults.baseURL = "http://13.124.80.203:2025";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([fork(postSaga), fork(userSaga)]);
}
