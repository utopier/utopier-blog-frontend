import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../Common/Button';
import TagButton from '../Common/TagButton';
import { RootState } from '../../store/reducers';
import {
  LIKE_POST_REQUEST,
  LOAD_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
} from '../../store/reducers/post';

const PostCardWrapper = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid #404b69;
  height: 530px;
  a {
    border-radius: 5px;
    &:foucus {
      box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
    }
    &:hover {
      box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .postCard--mainImg {
      width: 100%;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
    .postCard--title {
      width: 100%;
      margin: 15px 0;
      display: flex;
      justify-content: flex-start;
      h2 {
        font-size: 1.6em;
        font-weight: 600;
      }
    }
  }
  .postCard__tags {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .postCard__subInfo {
    width: 100%;
    display: flex;
    margin-top: 10px;
    div {
      width: 100%;
    }
  }
  .postCard__subInfo--likeBtn {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    button {
      background-color: transparent !important;
      border: 0;
      cursor: pointer;
      border-radius: 15px;
      outline: 0;
      &:foucus {
        box-shadow: 0 0 20px #00818a inset, 0 0 20px #00818a;
      }
      &:hover {
        box-shadow: 0 0 30px #00818a inset, 0 0 30px #00818a;
      }
    }
  }
  .postCard__subInfo--text {
    font-size: 0.8em;
    line-height: 1.3;
  }
  .postCard__author {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
  }
  .postCard--my-btn-group {
    a {
      width: 60px;
    }
  }
`;

const PostCard = ({ postData }: any) => {
  const { id, updatedDate, title, mainImgUrl, author, comments, tags, likers } = postData;
  const { me } = useSelector<RootState, any>((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let isLiked = me && likers && likers.find((v) => v.id === me.id);
  const onClickLikeBtn = useCallback(
    (e) => {
      if (isLiked) {
        dispatch({ type: UNLIKE_POST_REQUEST, data: id });
      } else {
        dispatch({ type: LIKE_POST_REQUEST, data: id });
      }
    },
    [isLiked, id],
  );
  const onClickPostLink = useCallback(() => {
    dispatch({ type: LOAD_POST_REQUEST, data: id });
  }, [id]);
  const onClickUpdatePost = useCallback(() => {
    dispatch({ type: LOAD_POST_REQUEST, data: id });
  }, [id]);
  const onClickDeletePost = useCallback(() => {
    const result = confirm('포스트를 삭제 합니다.');
    if (result) {
      dispatch({ type: REMOVE_POST_REQUEST, data: id });
    }
  }, [id]);
  return (
    <>
      <li>
        <PostCardWrapper>
          <Link href={`/post/${id}`}>
            <a className="postCard__postLink" onClick={onClickPostLink}>
              <div className="postCard--mainImg">
                <img
                  src={(mainImgUrl && mainImgUrl.src) || '/images/postMainDefault.jpg'}
                  width="300px"
                  height="210px"
                  alt="포스트 메인이미지"
                />
              </div>
              <div className="postCard--title">
                <h2>{title}</h2>
              </div>
            </a>
          </Link>
          {router.route === '/user' ? (
            <div className="postCard--my-btn-group" style={{ display: 'flex', margin: '10px' }}>
              <Link href={`/post/${id}/update`}>
                <a>
                  <Button text="수정" onClick={onClickUpdatePost} />
                </a>
              </Link>
              <Button text="삭제" onClick={onClickDeletePost} width="50px" />
            </div>
          ) : null}
          <div className="postCard__tags">
            {tags &&
              tags.map(({ name, id }) => {
                return (
                  <>
                    <TagButton id={id} name={name} />
                  </>
                );
              })}
          </div>
          <div className="postCard__subInfo">
            <div className="postCard__subInfo--likeBtn">
              <button onClick={onClickLikeBtn}>
                {isLiked ? (
                  <img src="/icons/liked.svg" width="30" height="30" />
                ) : (
                  <img src="/icons/unliked.svg" width="30" height="30" />
                )}
              </button>
              <br />
              <span>{(likers && likers.length) || '0'} like</span>
            </div>
            <div className="postCard__subInfo--text">
              <span> {updatedDate} updated</span>
              <br />
              <br />
              <span>{comments && comments.length} comment </span>
            </div>
            <div className="postCard__author">
              <img src={(author.avatar && author.avatar.src) || '/images/avatar.svg'} width="40" height="40" />
              <span>{author && author.nickname}</span>
            </div>
          </div>
        </PostCardWrapper>
      </li>
    </>
  );
};

export default PostCard;
