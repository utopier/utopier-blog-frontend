import { END } from 'redux-saga';
import axios from 'axios';
import styled from '@emotion/styled';

import { LOAD_MY_INFO_REQUEST } from '../../store/reducers/user';
import wrapper from '../../store';
import ChatRoom from '../../components/ChatRoom';

const ChatWrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 90%;
  div {
    border: 1px solid #00818a;
    box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
  }
`;

const Chat = () => {
  return (
    <ChatWrapper>
      <ChatRoom />
    </ChatWrapper>
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Chat;
