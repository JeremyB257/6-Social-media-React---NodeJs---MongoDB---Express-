const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

/* module.exports.checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}; */

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        //res.cookie('jwt', '', { maxAge: 1 });
        next();
      } else {
        let user = await userModel.findById(decodedToken.userId);
        res.locals.user = user;
        const userId = decodedToken.userId;
        req.auth = {
          userId: userId,
        };
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token');
      } else {
        //console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    // console.log('no token');
  }
};
