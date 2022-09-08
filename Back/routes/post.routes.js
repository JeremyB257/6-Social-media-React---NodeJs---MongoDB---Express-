const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multerMiddleware = require('../middleware/multer-config');

//CRUD POST
router.get('/', authMiddleware.checkUser, postController.readPost);
router.post('/', authMiddleware.checkUser, multerMiddleware, postController.createPost);
router.put('/:id', authMiddleware.checkUser, postController.updatePost);
router.delete('/:id', authMiddleware.checkUser, postController.deletePost);

//LIKE POST
router.patch('/:id/like', authMiddleware.checkUser, postController.likePost);

//COMMENTS POST
router.patch('/:id/comment-post', authMiddleware.checkUser, postController.commentPost);
router.patch('/:id/edit-comment-post', authMiddleware.checkUser, postController.editCommentPost);
router.patch('/:id/delete-comment-post', authMiddleware.checkUser, postController.deleteCommentPost);

module.exports = router;
