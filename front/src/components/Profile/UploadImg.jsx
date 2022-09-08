import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const validateFile = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (file === null || file === undefined) {
      setErrorMsg('Veuillez selectionnez un fichier');
      return;
    } else {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        setErrorMsg('Type de fichier invalide, format autorisé : jpg, jpeg, png');
        return;
      } else if (file.size > 500000) {
        setErrorMsg('Le fichier ne doit pas depasser 500 Ko');
        return;
      } else {
        setErrorMsg('');
        handlePicture(e);
      }
    }
  };

  const handlePicture = () => {
    const data = new FormData();
    data.append('name', userData.pseudo);
    data.append('userId', userData._id);
    data.append('file', file);
    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={validateFile} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
      <p>{errorMsg}</p>
    </form>
  );
};

export default UploadImg;
