import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import styled from '@emotion/styled';

import { LOAD_MY_INFO_REQUEST, LOAD_USERS_REQUEST } from '../../store/reducers/user';
import { LOAD_TAGS_REQUEST, LOAD_POSTS_REQUEST } from '../../store/reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import wrapper from '../../store';
import Button from '../../components/Common/Button';
import TagList from '../../components/TagList';
import SubNav from '../../components/SubNav';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border-radius: 3px;
  }
`;

const Tags = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { tags } = useSelector<RootState, any>((state) => state.post);
  const { allTagsCount } = useSelector<RootState, any>((state) => state.post);
  const dispatch = useDispatch();

  const allPage = Math.ceil(allTagsCount / 10);
  const buttonCountArr = [];
  for (let i = 0; i < allPage; i++) {
    buttonCountArr.push(i + 1);
  }
  let currentPage;
  let currentTags;

  const onClickPaginationBtn = (e) => {
    currentPage = e.target.textContent;
    dispatch({
      type: LOAD_TAGS_REQUEST,
      data: {
        lastId: (currentPage - 1) * 10,
      },
    });
    currentTags = tags.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
  };
  return (
    <>
      <Head>
        <title>Utoiper - Tags</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is an example of a meta description. This will often show up in search results."
        />
      </Head>
      <SubNav />
      <TagList tagData={currentPage || tags} />
      <PaginationWrapper>
        {buttonCountArr.map((num, i) => (
          <Button id={i} text={num} onClick={onClickPaginationBtn} />
        ))}
      </PaginationWrapper>
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
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  if (context.req.__NEXT_INIT_QUERY.searchTerm) {
    context.store.dispatch({
      type: LOAD_TAGS_REQUEST,
      data: { searchQuery: context.req.__NEXT_INIT_QUERY.searchTerm },
    });
  } else {
    context.store.dispatch({
      type: LOAD_TAGS_REQUEST,
    });
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Tags;
