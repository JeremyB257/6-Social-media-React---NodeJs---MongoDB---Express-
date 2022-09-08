import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { likePost, unLikePost } from '../../actions/post.actions';

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unLikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid && liked === false && <img src="./img/icons/heart.svg" alt="like-button" onClick={like} />}
      {uid && liked && <img src="./img/icons/heart-filled.svg" alt="unlike-button" onClick={unlike} />}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
