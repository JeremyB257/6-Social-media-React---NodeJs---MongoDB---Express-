import axios from 'axios';

//posts
export const GET_POSTS = 'GET_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POSTS = 'ADD_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// comments
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// trend
export const GET_TRENDS = 'GET_TRENDS';

//errors
export const GET_POST_ERRORS = 'GET_POST_ERRORS';

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_PUBLIC_URL}api/post`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.error });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: '' });
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error) {
          dispatch({ type: GET_POST_ERRORS, payload: err.response.data.error });
        }
      });
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}/like`,
      withCredentials: true,
      data: { id: userId, like: 1 },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unLikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}/like`,
      withCredentials: true,
      data: { id: userId, like: 0 },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message, access) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}`,
      withCredentials: true,
      data: { message, access },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId, access) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}`,
      withCredentials: true,
      data: { access },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

//comments

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}/comment-post`,
      withCredentials: true,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text, access) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}/edit-comment-post`,
      withCredentials: true,
      data: { commentId, text, access },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId, access) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/post/${postId}/delete-comment-post`,
      withCredentials: true,
      data: { commentId, access },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

//trend
export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};
