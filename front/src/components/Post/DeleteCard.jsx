import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../actions/post.actions';

const DeleteCard = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(deletePost(props.id, userData.access)).then(() => dispatch(getPosts()));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-ous supprimer ce post ?')) {
          deleteCard();
        }
      }}>
      <img src="./img/icons/trash.svg" alt="delete-icon" />
    </div>
  );
};

export default DeleteCard;
