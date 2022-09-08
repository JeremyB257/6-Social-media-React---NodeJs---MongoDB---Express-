const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multerMiddleware = require('../middleware/multer-config');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// auth
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// user DB
router.get('/', authMiddleware.checkUser, userController.getAllUsers);
router.get('/:id', authMiddleware.checkUser, userController.userInfo);
router.put('/:id', authMiddleware.checkUser, userController.updateUser);
router.delete('/:id', authMiddleware.checkUser, userController.deleteUser);

//Upload
router.post('/upload/:id', authMiddleware.checkUser, multerMiddleware, uploadController.uploadProfil);

module.exports = router;
