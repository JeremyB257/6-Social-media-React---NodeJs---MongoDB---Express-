import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment, getPosts } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text, userData.access)).then(() => dispatch(getPosts()));
      setText('');
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id, userData.access)).then(() => dispatch(getPosts()));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {(isAuthor || userData.access === 1) && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-icon" />
        </span>
      )}
      {(isAuthor || userData.access === 1) && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm('Voulez vous supprimer ce commentaire ?')) {
                  handleDelete();
                }
              }}>
              <img src="./img/icons/trash.svg" alt="trash-icon" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
