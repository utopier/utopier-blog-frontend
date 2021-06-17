import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import Button from '../Common/Button';
import { REMOVE_COMMENT_REQUEST, UPDATE_COMMENT_REQUEST } from '../../store/reducers/post';
import useInput from '../../hooks/useInput';
import { RootState } from '../../store/reducers';

const CommentCardWrapper = styled.div`
  padding: 10px;
  margin: 2px 0;
  border: 1px solid #dbedf3;
  border-radius: 5px;
  div:first-child {
    display: flex;
    margin-bottom: 20px;
    div {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .comment-card--btn-group {
      flex-direction: row;
      div {
        margin-left: 0;
      }
    }
  }
  .comment-card--content {
    display: ${(props: any) => (props.clikedUpdateBtn ? 'none' : 'static')};
  }
  .comment-card--content-update {
    display: ${(props) => (props.clikedUpdateBtn ? 'static' : 'none')};
  }
`;

const CommentCard = ({ commentData }) => {
  console.log('Rendering CommentCard');
  const { id, createdDate, content, user } = commentData;
  const { me } = useSelector<RootState, any>((state) => state.user);
  const dispatch = useDispatch();
  const [clikedUpdateBtn, setCliekdUpdateBtn] = useState(false);
  const [commentUpdateTextarea, onChangecommentUpdateTextarea] = useInput('');

  const router = useRouter();

  const onClickUpdateCommentBtn = () => {
    setCliekdUpdateBtn(!clikedUpdateBtn);
    console.log(clikedUpdateBtn);
  };

  const onClickDeleteCommentBtn = () => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        postId: router.query.postId,
        commentId: id,
      },
    });
  };

  const onClickUpdateConfirmBtn = () => {
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      data: {
        postId: router.query.postId,
        commentId: id,
        content: commentUpdateTextarea,
      },
    });
    setCliekdUpdateBtn(!clikedUpdateBtn);
  };

  return (
    <>
      <CommentCardWrapper clikedUpdateBtn={clikedUpdateBtn}>
        <div>
          <img src="/images/avatar.svg" width="35" height="35" />
          <div>
            <span>{user.nickname}</span>
            <span>{createdDate || '2020년 10월 1일'}</span>
          </div>
          {me && me.id === user.id ? (
            <div className="comment-card--btn-group">
              <Button text="수정" width="50px" height="25px" onClick={onClickUpdateCommentBtn} />
              <Button text="삭제" width="50px" height="25px" onClick={onClickDeleteCommentBtn} />
            </div>
          ) : null}
        </div>
        <div>
          <div className="comment-card--content">
            <p>{content}</p>
          </div>
          <div className="comment-card--content-update">
            <textarea onChange={onChangecommentUpdateTextarea} value={commentUpdateTextarea}></textarea>
            <Button text="확인" width="50px" onClick={onClickUpdateConfirmBtn} />
          </div>
        </div>
      </CommentCardWrapper>
    </>
  );
};

export default CommentCard;
