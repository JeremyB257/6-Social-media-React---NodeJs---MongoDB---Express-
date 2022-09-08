const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');

exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

exports.login = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({ message: 'email/mot de passe incorrect' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: 'email/mot de passe incorrect' });
            } else {
              const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
                expiresIn: '24h',
              });
              res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
              res.status(200).json({
                userId: user._id,
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
