import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Common/Button';
import WysiwygEditor from '../../components/WysiwygEditor';
import useInput from '../../hooks/useInput';
import { LOAD_MY_INFO_REQUEST } from '../../store/reducers/user';
import { LOAD_POSTS_REQUEST } from '../../store/reducers/post';
import wrapper from '../../store';
import { RootState } from '../../store/reducers';
import { UPLOAD_IMAGES_REQUEST, CREATE_POST_REQUEST, REMOVE_IMAGES_REQUEST } from '../../store/reducers/post';

const CreatePostWrapper = styled.div`
  .te-preview {
    background-color: none;
    color: white;
  }
  .tui-editor-contents p {
    color: white;
  }
  .tui-editor-contents h1,
  .tui-editor-contents h2,
  .tui-editor-contents h3,
  .tui-editor-contents h4,
  .tui-editor-contents h5,
  .tui-editor-contents h6 {
    color: white;
  }
  .tui-editor-contents del {
    color: gray;
  }
  .tui-editor-contents ol > li::before {
    color: white;
  }
  .tui-editor-contents table,
  .tui-editor-contents table th,
  .tui-editor-contents table td {
    border-color: #dbedf3;
    color: white;
  }
  .tui-editor-contents table th {
    background-color: #00818a;
  }
  .tui-editor-contents pre {
    background-color: #404b69;
  }
  .tui-editor-contents pre code {
    color: white;
    background-color: #404b69;
  }

  .tui-editor-defaultUI-toolbar {
    background-color: #404b69;
    border: 1px solid #00818a;

    box-shadow: 0 0 10px #00818a;
  }
  .tui-editor-defaultUI-toolbar button,
  .tui-editor-defaultUI-toolbar button:hover,
  .tui-editor-defaultUI-toolbar button:active,
  .tui-editor-defaultUI-toolbar button.active {
    border: 1px solid #00818a;

    box-shadow: 0 0 10px #00818a;
    &:foucus {
      box-shadow: 0 0 5px #00818a inset, 0 0 30px #00818a;
    }
    &:hover {
      box-shadow: 0 0 5px #00818a inset, 0 0 30px #00818a;
    }
  }
  .tui-editor-defaultUI {
    border: 1px solid #00818a;
    box-shadow: 0 0 20px #00818a;
  }
  .te-ww-container {
    background-color: #283149;
    color: white;
  }
  .te-mode-switch-section {
    border: 1px solid #00818a;
    background-color: #404b69;
    box-shadow: 0 0 10px #00818a;
  }
  .te-mode-switch button {
    color: #555;
  }
  .te-mode-switch button.active {
    border: 1px solid #00818a;
    box-shadow: 0 0 5px #00818a inset, 0 0 10px #00818a;
  }

  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .create-post__field-group {
    min-height: 100px;
    width: 100%;
    max-width: 1000px;
    border: 1px solid #00818a;
    box-shadow: 0 0 5px #00818a inset, 0 0 10px #00818a;

    label {
      margin-right: 10px;
    }
    input {
      margin-top: 10px;
      width: 100%;
      max-width: 600px;
    }
    input[type='file'] {
      max-width: 245px;
      box-shadow: 0 0 5px #00818a inset, 0 0 10px #00818a;
    }
    div {
      font-size: 1.2em;
      padding: 1px 10px;
    }

    .tag-container {
      background-color: white;
      margin-top: 10px;
      max-width: 600px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      align-content: flex-start;
      outline: none;
      border-radius: 5px;
      border: 1px solid #00818a;
      height: 25px;
      &:foucus {
        box-shadow: 0 0 5px #00818a inset, 0 0 20px #00818a;
      }
      &:hover {
        box-shadow: 0 0 5px #00818a inset, 0 0 20px #00818a;
      }
      .tag {
        display: flex;
        align-items: center;
        font-size: 0.6em;
        background-color: #dbedf3;
        color: #00818a;
        border-radius: 10px;
        height: 20px;
        padding: 0 5px;
        margin: 0 1px;
        i {
          padding-left: 2px;
          color: white;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
      input {
        outline: 0;
        border: 0;
        margin: 0 1px;
        flex: 1;
        border-radius: 0;
      }
    }
    .remove-img-btn {
      margin-left: 2px;
      border-radius: 5px;
      width: 30px;
      height: 30px;
    }
    .create-post__field-group--create-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        box-shadow: 0 0 5px #00818a inset, 0 0 10px #00818a;
      }
    }
  }
  .create-post__field-group--fields {
    div {
      margin: 2px 0;
    }
  }
  .create-post__editor {
    width: 100%;
  }
  .mainImage-field-wrapper {
    display: flex;
    align-items: center;
    div {
      padding: 0;
    }
  }
  @media (max-width: 904px) {
    .tags-field-wrapper {
      flex-direction: column;
    }
    .mainImage-field-wrapper {
      flex-direction: column;
      align-items: flex-start;
      #mainImage {
        width: 200px;
      }
    }
  }
`;

const CreatePost = () => {
  const [title, onChangeTitle] = useInput('');
  const tags = useRef([]);
  const content = useRef('');

  const { createPostMainImg, addPostDone, addPostError } = useSelector<RootState, any>((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone && !addPostError) {
      Router.replace('/posts');
    }
  }, [addPostDone]);

  let tagContainer: null | HTMLDivElement;
  let input;
  if ((process as any).browser) {
    tagContainer = document.querySelector('.tag-container');
    input = document.querySelector('.tag-container input');
  }
  function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeIcon = document.createElement('i');
    closeIcon.innerHTML = 'X';
    closeIcon.addEventListener('click', (e: any) => {
      console.log(e);
      if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.current.indexOf(tagLabel);
        tags.current.splice(index, 1);
        addTags();
      }
    });
    closeIcon.setAttribute('class', 'material-icons');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
  }
  function addTags() {
    clearTags();
    tags.current.reverse().forEach((tag) => tagContainer.prepend(createTag(tag)));
  }
  function clearTags() {
    document.querySelectorAll('.tag').forEach((tag) => {
      tag.parentElement.removeChild(tag);
    });
  }
  const onKeyUpTagField = (e) => {
    if (e.keyCode === 32) {
      e.target.value.split(',').forEach((tag) => {
        tags.current.push(tag);
      });
      addTags();
      e.target.value = '';
    }
  };

  const onChangeMainImg = (e) => {
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  };
  const onRemoveMainImg = () => {
    dispatch({
      type: REMOVE_IMAGES_REQUEST,
      data: { images: createPostMainImg[0].path },
    });
  };
  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const onChangeEditor = (value: string) => {
    content.current = value;
    const contentBaseURLImg = content.current.match(/data:image\/[a-z]+;base64,/g);
    let contentImages = new FormData();
    if (contentBaseURLImg && contentBaseURLImg.length > 1) {
      let baseURLImg: any = content.current.match(/data:image\/[a-z]+;base64,/);
    } else if (contentBaseURLImg && contentBaseURLImg.length === 1) {
      let baseURLImg: any = content.current.match(/data:image\/[a-z]+;base64,/);
      let baseURLImgObj = content.current.slice(baseURLImg.index).match(/[)]/);
      let imgFile = dataURLtoFile(baseURLImgObj.input.slice(0, -1), 'text.png');
      contentImages.append('images', imgFile);
    }
  };

  const onClickCreate = (e) => {
    dispatch({
      type: CREATE_POST_REQUEST,
      data: {
        title,
        tags: tags.current,
        mainImgUrl: createPostMainImg || '',
        content: content.current,
      },
    });
  };

  console.log('createPostMainImg : ', createPostMainImg);

  return (
    <CreatePostWrapper>
      <div className="create-post__field-group">
        <div className="create-post__field-group--fields">
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" onChange={onChangeTitle} />
          </div>
          <div className="tags-field-wrapper" style={{ display: 'flex' }}>
            <label htmlFor="tags">Tags</label>
            <div className="tag-container">
              <input id="tags" onKeyUp={onKeyUpTagField} type="text" />
            </div>
          </div>
          <div className="mainImage-field-wrapper">
            <label htmlFor="mainImage">Main Image</label>
            <div>
              {createPostMainImg && <img src={createPostMainImg} />}
              <input id="mainImage" type="file" onChange={onChangeMainImg} />
              <button className="remove-img-btn" onClick={onRemoveMainImg}>
                X
              </button>
            </div>
          </div>
        </div>
        <div className="create-post__field-group--create-btn">
          <Button onClick={onClickCreate} text="Create Post" width="200px" />
        </div>
      </div>
      <div className="create-post__editor">
        <WysiwygEditor
          onChange={onChangeEditor}
          initialValue={`# hello react editor world!\n## h2\n**bolg**\n*italic*\n ~~strike~~\n* * *\n> blockquoteddd`}
        />
      </div>
    </CreatePostWrapper>
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
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default CreatePost;
