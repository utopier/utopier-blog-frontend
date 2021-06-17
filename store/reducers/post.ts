import produce from 'immer';

// 액션 type
export const CREATE_POST_REQUEST = 'post/CREATE_POST_REQUEST' as const;
export const CREATE_POST_SUCCESS = 'post/CREATE_POST_SUCCESS' as const;
export const CREATE_POST_FAILURE = 'post/CREATE_POST_FAILURE' as const;

export const UPLOAD_IMAGES_REQUEST = 'post/UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'post/UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'post/UPLOAD_IMAGES_FAILURE' as const;

export const REMOVE_IMAGES_REQUEST = 'post/REMOVE_IMAGES_REQUEST' as const;
export const REMOVE_IMAGES_SUCCESS = 'post/REMOVE_IMAGES_SUCCESS' as const;
export const REMOVE_IMAGES_FAILURE = 'post/REMOVE_IMAGES_FAILURE' as const;
//export const REMOVE_IMAGE = 'post/REMOVE_IMAGE' as const;

export const LOAD_POSTS_REQUEST = 'post/LOAD_POSTS_REQUEST' as const;
export const LOAD_POSTS_SUCCESS = 'post/LOAD_POSTS_SUCCESS' as const;
export const LOAD_POSTS_FAILURE = 'post/LOAD_POSTS_FAILURE' as const;

export const LOAD_TAGS_REQUEST = 'post/LOAD_TAGS_REQUEST' as const;
export const LOAD_TAGS_SUCCESS = 'post/LOAD_TAGS_SUCCESS' as const;
export const LOAD_TAGS_FAILURE = 'post/LOAD_TAGS_FAILURE' as const;

export const LOAD_POST_REQUEST = 'post/LOAD_POST_REQUEST' as const;
export const LOAD_POST_SUCCESS = 'post/LOAD_POST_SUCCESS' as const;
export const LOAD_POST_FAILURE = 'post/LOAD_POST_FAILURE' as const;

export const UPDATE_POST_REQUEST = 'post/UPDATE_POST_REQUEST' as const;
export const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS' as const;
export const UPDATE_POST_FAILURE = 'post/UPDATE_POST_FAILURE' as const;

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST' as const;
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS' as const;
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE' as const;

export const LIKE_POST_REQUEST = 'post/LIKE_POST_REQUEST' as const;
export const LIKE_POST_SUCCESS = 'post/LIKE_POST_SUCCESS' as const;
export const LIKE_POST_FAILURE = 'post/LIKE_POST_FAILURE' as const;

export const UNLIKE_POST_REQUEST = 'post/UNLIKE_POST_REQUEST' as const;
export const UNLIKE_POST_SUCCESS = 'post/UNLIKE_POST_SUCCESS' as const;
export const UNLIKE_POST_FAILURE = 'post/UNLIKE_POST_FAILURE' as const;

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST' as const;
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS' as const;
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE' as const;

export const UPDATE_COMMENT_REQUEST = 'post/UPDATE_COMMENT_REQUEST' as const;
export const UPDATE_COMMENT_SUCCESS = 'post/UPDATE_COMMENT_SUCCESS' as const;
export const UPDATE_COMMENT_FAILURE = 'post/UPDATE_COMMENT_FAILURE' as const;

export const REMOVE_COMMENT_REQUEST = 'post/REMOVE_COMMENT_REQUEST' as const;
export const REMOVE_COMMENT_SUCCESS = 'post/REMOVE_COMMENT_SUCCESS' as const;
export const REMOVE_COMMENT_FAILURE = 'post/REMOVE_COMMENT_FAILURE' as const;

// 액션 생성함수
export const createPostRequest = (data: object) => ({
  type: CREATE_POST_REQUEST,
  data,
});
export const createPostSuccess = (data: object) => ({
  type: CREATE_POST_SUCCESS,
  data,
});
export const createPostFailure = (data: object) => ({
  type: CREATE_POST_FAILURE,
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
// export const removeImages = (id: number) => ({
// 	type: REMOVE_IMAGE,
// 	data: id,
// });

export const loadPostsRequest = (id: number) => ({
  type: LOAD_POSTS_REQUEST,
  data: id,
});
export const loadPostsSuccess = (id: number) => ({
  type: LOAD_POSTS_SUCCESS,
  data: id,
});
export const loadPostsFailure = (id: number) => ({
  type: LOAD_POSTS_FAILURE,
  data: id,
});

export const loadTagsRequest = (id: number) => ({
  type: LOAD_TAGS_REQUEST,
  data: id,
});
export const loadTagsSuccess = (id: number) => ({
  type: LOAD_TAGS_SUCCESS,
  data: id,
});
export const loadTagsFailure = (id: number) => ({
  type: LOAD_TAGS_FAILURE,
  data: id,
});

export const loadPostRequest = (id: number) => ({
  type: LOAD_POST_REQUEST,
  data: id,
});
export const loadPostSuccess = (id: number) => ({
  type: LOAD_POST_SUCCESS,
  data: id,
});
export const loadPostFailure = (id: number) => ({
  type: LOAD_POST_FAILURE,
  data: id,
});

export const updatePostRequest = (id: number) => ({
  type: UPDATE_POST_REQUEST,
  data: id,
});
export const updatePostSuccess = (id: number) => ({
  type: UPDATE_POST_SUCCESS,
  data: id,
});
export const updatePostFailure = (id: number) => ({
  type: UPDATE_POST_FAILURE,
  data: id,
});

export const removePostRequest = (id: number) => ({
  type: REMOVE_POST_REQUEST,
  data: id,
});
export const removePostSuccess = (id: number) => ({
  type: REMOVE_POST_SUCCESS,
  data: id,
});
export const removePostFailure = (id: number) => ({
  type: REMOVE_POST_FAILURE,
  data: id,
});

export const likePostRequest = (id: number) => ({
  type: LIKE_POST_REQUEST,
  data: id,
});
export const likePostSuccess = (id: number) => ({
  type: LIKE_POST_SUCCESS,
  data: id,
});
export const likePostFailure = (id: number) => ({
  type: LIKE_POST_FAILURE,
  data: id,
});

export const unlikePostRequest = (id: number) => ({
  type: UNLIKE_POST_REQUEST,
  data: id,
});
export const unlikePostSuccess = (id: number) => ({
  type: UNLIKE_POST_SUCCESS,
  data: id,
});
export const unlikePostFailure = (id: number) => ({
  type: UNLIKE_POST_FAILURE,
  data: id,
});

export const addCommentRequest = (id: number) => ({
  type: ADD_COMMENT_REQUEST,
  data: id,
});
export const addCommentSuccess = (id: number) => ({
  type: ADD_COMMENT_SUCCESS,
  data: id,
});
export const addCommentFailure = (id: number) => ({
  type: ADD_COMMENT_FAILURE,
  data: id,
});

export const updateCommentRequest = (id: number) => ({
  type: UPDATE_COMMENT_REQUEST,
  data: id,
});
export const updateCommentSuccess = (id: number) => ({
  type: UPDATE_COMMENT_SUCCESS,
  data: id,
});
export const updateCommentFailure = (id: number) => ({
  type: UPDATE_COMMENT_FAILURE,
  data: id,
});

export const removeCommentRequest = (id: number) => ({
  type: REMOVE_COMMENT_REQUEST,
  data: id,
});
export const removeCommentSuccess = (id: number) => ({
  type: REMOVE_COMMENT_SUCCESS,
  data: id,
});
export const removeCommentFailure = (id: number) => ({
  type: REMOVE_COMMENT_FAILURE,
  data: id,
});

// 액션 타입스크립트 타입
export type PostAction =
  | ReturnType<typeof createPostRequest>
  | ReturnType<typeof createPostSuccess>
  | ReturnType<typeof createPostFailure>
  | ReturnType<typeof uploadImagesRequest>
  | ReturnType<typeof uploadImagesSuccess>
  | ReturnType<typeof uploadImagesFailure>
  | ReturnType<typeof removeImagesRequest>
  | ReturnType<typeof removeImagesSuccess>
  | ReturnType<typeof removeImagesFailure>
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostsSuccess>
  | ReturnType<typeof loadPostsFailure>
  | ReturnType<typeof loadTagsRequest>
  | ReturnType<typeof loadTagsSuccess>
  | ReturnType<typeof loadTagsFailure>
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostSuccess>
  | ReturnType<typeof loadPostFailure>
  | ReturnType<typeof updatePostRequest>
  | ReturnType<typeof updatePostSuccess>
  | ReturnType<typeof updatePostFailure>
  | ReturnType<typeof removePostRequest>
  | ReturnType<typeof removePostSuccess>
  | ReturnType<typeof removePostFailure>
  | ReturnType<typeof likePostRequest>
  | ReturnType<typeof likePostSuccess>
  | ReturnType<typeof likePostFailure>
  | ReturnType<typeof unlikePostRequest>
  | ReturnType<typeof unlikePostSuccess>
  | ReturnType<typeof unlikePostFailure>
  | ReturnType<typeof addCommentRequest>
  | ReturnType<typeof addCommentSuccess>
  | ReturnType<typeof addCommentFailure>
  | ReturnType<typeof updateCommentRequest>
  | ReturnType<typeof updateCommentSuccess>
  | ReturnType<typeof updateCommentFailure>
  | ReturnType<typeof removeCommentRequest>
  | ReturnType<typeof removeCommentSuccess>
  | ReturnType<typeof removeCommentFailure>;

// 상태를 위한 타입 선언
export type PostState = {
  mainPosts: PostType[];
  allPostsCount: string;
  searchedPostsCount: string;
  singlePost: null | PostType;
  tags: any;
  allTagsCount: string;
  searchedTagsCount: string;
  createPostMainImg: string;
  hasMorePosts: boolean;
  hasMoreTags: boolean;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: null | string;
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: null | string;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: null | string;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | string;
  loadTagsLoading: boolean;
  loadTagsDone: boolean;
  loadTagsError: null | string;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: null | string;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: null | string;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: null | string;
  updateCommentLoading: boolean;
  updateCommentDone: boolean;
  updateCommentError: null | string;
  removeCommentLoading: boolean;
  removeCommentDone: boolean;
  removeCommentError: null | string;
  postUploadImagesLoading: boolean;
  postUploadImagesDone: boolean;
  postUploadImagesError: null | string;
  postRemoveImagesLoading: boolean;
  postRemoveImagesDone: boolean;
  postRemoveImagesError: null | string;
};

export type PostType = {
  id: number;
  postMainImgUrl: string;
  title: string;
  summary: string;
  updatedDate: string;
  comments: Comment[];
  likers: any[];
  author: {
    username: string;
    avataUrl: string;
  };
};

export type Comment = {
  id: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  user: {
    nickname: string;
  };
};

// 초깃값 설정
const initialState: PostState = {
  mainPosts: [],
  allPostsCount: '',
  searchedPostsCount: '',
  tags: [],
  allTagsCount: '',
  searchedTagsCount: '',
  singlePost: null,
  createPostMainImg: '',
  hasMorePosts: true,
  hasMoreTags: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadTagsLoading: false,
  loadTagsDone: false,
  loadTagsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  postUploadImagesLoading: false,
  postUploadImagesDone: false,
  postUploadImagesError: null,
  postRemoveImagesLoading: false,
  postRemoveImagesDone: false,
  postRemoveImagesError: null,
};

// 리듀서
const reducer = (state: PostState = initialState, action: any): PostState =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'post/CREATE_POST_REQUEST':
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case 'post/CREATE_POST_SUCCESS':
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.createPostMainImg = '';
        break;
      case 'post/CREATE_POST_FAILURE':
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case 'post/UPLOAD_IMAGES_REQUEST':
        draft.postUploadImagesLoading = true;
        draft.postUploadImagesDone = false;
        draft.postUploadImagesError = null;
        break;
      case 'post/UPLOAD_IMAGES_SUCCESS':
        draft.createPostMainImg = action.data;
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesDone = true;
        break;
      case 'post/UPLOAD_IMAGES_FAILURE':
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesError = action.error;
        break;
      case 'post/REMOVE_IMAGES_REQUEST':
        draft.postRemoveImagesLoading = true;
        draft.postRemoveImagesDone = false;
        draft.postRemoveImagesError = null;
        break;
      case 'post/REMOVE_IMAGES_SUCCESS':
        draft.createPostMainImg = '';
        draft.postRemoveImagesLoading = false;
        draft.postRemoveImagesDone = true;
        break;
      case 'post/REMOVE_IMAGES_FAILURE':
        draft.postRemoveImagesLoading = false;
        draft.postRemoveImagesError = action.error;
        break;

      // case 'post/REMOVE_IMAGE':
      // 	draft.createPostMainImg = draft.createPostMainImg.filter((v, i) => i !== action.data);
      // 	break;
      case 'post/LOAD_POSTS_REQUEST':
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case 'post/LOAD_POSTS_SUCCESS':
        draft.loadPostsLoading = false;
        if (action.data.filtering && !action.data.skipNum) {
          draft.mainPosts = action.data.posts;
          if (action.data.searchedPostsCount) {
            draft.searchedPostsCount = action.data.searchedPostsCount;
          }
          if (action.data.postsCount) {
            draft.allPostsCount = action.data.postsCount;
          }
        } else if (action.data.skipNum >= 10) {
          draft.mainPosts = draft.mainPosts.concat(action.data.posts);
        }
        draft.hasMorePosts = action.data.posts.length === 10;
        draft.loadPostsDone = true;
        break;
      case 'post/LOAD_POSTS_FAILURE':
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case 'post/LOAD_TAGS_REQUEST':
        draft.loadTagsLoading = true;
        draft.loadTagsDone = false;
        draft.loadTagsError = null;
        break;
      case 'post/LOAD_TAGS_SUCCESS':
        draft.loadTagsLoading = false;
        draft.loadTagsDone = true;
        console.log('load tags success : ', action.data);
        if (action.data.filtering) {
          draft.tags = action.data.tags;
          if (action.data.searchedTagsCount) {
            draft.searchedTagsCount = action.data.searchedTagsCount;
          }
          if (action.data.tagsCount) {
            draft.allTagsCount = action.data.tagsCount;
          }
        } else if (action.data.skipNum) {
          draft.tags = draft.tags.concat(action.data.tags);
        } else {
          draft.tags = draft.tags.concat(action.data.tags);
        }
        draft.hasMoreTags = action.data.tags.length === 10;
        break;
      case 'post/LOAD_TAGS_FAILURE':
        draft.loadTagsLoading = false;
        draft.loadTagsError = action.error;
        break;
      case 'post/LOAD_POST_REQUEST':
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case 'post/LOAD_POST_SUCCESS':
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case 'post/LOAD_POST_FAILURE':
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case 'post/UPDATE_POST_REQUEST':
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case 'post/UPDATE_POST_SUCCESS':
        console.log('update_post_success : ', action.data);
        //draft.mainPosts.find((v) => v.id === action.data.PostId) = action.data.newPost;
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        break;
      case 'post/UPDATE_POST_FAILURE':
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case 'post/REMOVE_POST_REQUEST':
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case 'post/REMOVE_POST_SUCCESS':
        console.log('remove post : ', action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
        break;
      case 'post/REMOVE_POST_FAILURE':
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case 'post/LIKE_POST_REQUEST':
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case 'post/LIKE_POST_SUCCESS': {
        console.log('LIKE POST SUCCESS - action.data : ', action.data);
        const post = draft.mainPosts.find((v) => {
          console.log(+action.data.postId);
          return +v.id === +action.data.postId;
        });
        console.log('LIKE POST SUCCESS - post data : ', post);
        post?.likers.push({ id: action.data.userId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case 'post/LIKE_POST_FAILURE':
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case 'post/UNLIKE_POST_REQUEST':
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case 'post/UNLIKE_POST_SUCCESS': {
        const post = draft.mainPosts.find((v) => v.id === +action.data.postId);
        post.likers = post.likers.filter((v) => v.id !== action.data.userId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case 'post/UNLIKE_POST_FAILURE':
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case 'post/ADD_COMMENT_REQUEST':
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case 'post/ADD_COMMENT_SUCCESS':
        console.log('action.data : ', action.data);
        draft.singlePost.comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case 'post/ADD_COMMENT_FAILURE':
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case 'post/UPDATE_COMMENT_REQUEST':
        draft.updateCommentLoading = true;
        draft.updateCommentDone = false;
        draft.updateCommentError = null;
        break;
      case 'post/UPDATE_COMMENT_SUCCESS':
        console.log(draft.singlePost.comments);
        console.log('UPDATE_COMMENT_SUCCESS actiond.data : ', action.data);
        // const post = draft.mainPosts.find((v) => v.id === +action.data.postId);
        // post.likers = post.likers.filter((v) => v.id !== action.data.userId);
        draft.singlePost.comments.forEach((v) => {
          if (v.id == action.data.id) {
            console.log(v.content);
            v.content = action.data.content;
            console.log(v.content);
          }
        });
        draft.updateCommentLoading = false;
        draft.updateCommentDone = true;
        break;
      case 'post/UPDATE_COMMENT_FAILURE':
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        break;
      case 'post/REMOVE_COMMENT_REQUEST':
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case 'post/REMOVE_COMMENT_SUCCESS':
        console.log('REMOVE_COMMENT_SUCCESS action.data : ', action.data.commentId);
        draft.singlePost.comments = draft.singlePost.comments.filter((v) => {
          console.log(v.id);
          return v.id != action.data.commentId;
        });
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      case 'post/REMOVE_COMMENT_FAILURE':
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
      default:
        return state;
    }
  });

export default reducer;
