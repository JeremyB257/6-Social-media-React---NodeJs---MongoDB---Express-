const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const fs = require('fs');

//CRUD POST
exports.readPost = (req, res) => {
  PostModel.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ err }));
};

exports.createPost = (req, res) => {
  if (req.body.posterId != req.auth.userId) {
    res.status(401).json({ message: 'Not authorized' });
  } else {
    if (req.file !== undefined) {
      if (req.file.mimetype != 'image/jpg' && req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
        return res.status(400).json({ error: 'Type de fichier invalide, format autorisé : jpg, jpeg, png' });
      }
      if (req.file.size > 500000) {
        return res.status(400).json({ error: 'Le fichier ne doit pas depasser 500 Ko' });
      }
    }
    const newPost = new postModel({
      posterId: req.body.posterId,
      message: req.body.message,
      picture: req.file ? `./uploads/post/${req.file.filename}` : '',
      video: req.body.video,
      likers: [],
      comments: [],
    });
    newPost
      .save()
      .then(() => res.status(201).json({ message: 'Post enregistré !' }))
      .catch((err) => res.status(400).json({ err }));
  }
};

exports.updatePost = (req, res) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.posterId != req.auth.userId && req.body.access != 1) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        PostModel.updateOne({ _id: req.params.id }, { $set: { message: req.body.message } })
          .then(() => res.status(200).json({ message: 'Post modifié !' }))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deletePost = (req, res) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.posterId != req.auth.userId && req.body.access != 1) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = post.picture.split('/post/')[1];
        fs.unlink(`../front/public/uploads/post/${filename}`, () => {
          PostModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé' }))
            .catch((err) => res.status(401).json({ err }));
        });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

//LIKE POST
exports.likePost = (req, res) => {
  let userLiked = null;
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      for (i = 0; i < post.likers.length; i++) {
        if (req.auth.userId == post.likers[i]) {
          userLiked = "he's like";
        } else {
          userLiked = null;
        }
      }
      if (req.body.like > 0 && userLiked == null) {
        const usersLikedArray = post.likers;
        usersLikedArray.push(req.auth.userId);
        PostModel.updateOne({ _id: req.params.id }, { $set: { likers: usersLikedArray } })
          .then(() => res.status(200).json({ message: 'Like ajouté !' }))
          .catch((err) => res.status(401).json({ err }));
        return;
      } else {
        const usersLikedArray = post.likers;
        if (userLiked) {
          usersLikedArray.splice(usersLikedArray.indexOf(req.auth.userId), 1);
        }
        PostModel.updateOne({ _id: req.params.id }, { $set: { likers: usersLikedArray } })
          .then(() => res.status(200).json({ message: 'Like retiré !' }))
          .catch((err) => res.status(401).json({ err }));
      }
    })
    .catch((err) => res.status(401).json({ err }));
};

//COMMENT POST
exports.commentPost = (req, res) => {
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res) => {
  console.log(req.body);
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const theComment = post.comments.find((comment) => comment._id.equals(req.body.commentId));

      if (!theComment) {
        return res.status(404).json({ message: 'Not found' });
      } else {
        if (theComment.commenterId != req.auth.userId && req.body.access != 1) {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          theComment.text = req.body.text;

          post.save((err) => {
            if (!err) return res.status(200).json({ message: 'commentaire modifié' });
            return res.status(500).json({ err });
          });
        }
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.deleteCommentPost = (req, res) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const theComment = post.comments.find((comment) => comment._id.equals(req.body.commentId));
      if (theComment.commenterId != req.auth.userId && req.body.access != 1) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        PostModel.findByIdAndUpdate(req.params.id, {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
