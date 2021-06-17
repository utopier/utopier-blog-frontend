import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper from '../store';
import { LOAD_MY_INFO_REQUEST } from '../store/reducers/user';

// 뉴포미즘

// layout(grid, flex)

// Storybook
// slider
// dropdown
// modal
// animation
// interactive page

// video
// img
// font

function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/posts');
  });
  return (
    <>
      <div>Maintenance...</div>
    </>
  );
}

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

export default HomePage;
