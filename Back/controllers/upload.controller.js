const UserModel = require('../models/user.model');
const fs = require('fs');

exports.uploadProfil = (req, res) => {
  if (req.file.mimetype != 'image/jpg' && req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
    return res.status(400).json({ error: 'Type de fichier invalide, format autorisé : jpg, jpeg, png' });
  }
  if (req.file.size > 500000) {
    return res.status(400).json({ error: 'Le fichier ne doit pas depasser 500 Ko' });
  }
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        UserModel.updateOne(
          { _id: req.params.id },
          {
            $set: {
              picture: `uploads/profil/${req.file.filename}`,
            },
          }
        )
          .then(() => res.status(200).json({ message: 'Profil modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((err) => res.status(404).json({ err }));
};
