const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/mongo_mappers/user');
const secret = require('../config/token/index');

const signIn = (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username })
    .then((userFound) => {
      if (userFound) {
        return bcrypt.compare(password, userFound.password)
          .then(isValid => ({
            isValid,
            user: userFound,
          }));
      }
      return Promise.reject(new Error('User not found'));
    })
    .then(({ isValid, user }) => {
      if (isValid) {
        const token = jwt.sign({
          id: user.id,
          ...user,
          iat: moment().unix(),
          exp: moment().add(14, 'days').unix(),
        }, secret.secret);
        return res.send({
          token,
          user,
        });
      }
      return Promise.reject(new Error('Incorrect password'));
    })
    .catch((err) => {
      res.status(500).send({
        error: err || 'Error signin in',
      });
    });
};

const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, secret.secret, (err, decoded) => {
    if (!err) {
      resolve(decoded);
    } else {
      reject(new Error('Failed to authenticate token'));
    }
  });
});

const checkSessionToken = (req, res) => {
  const { token } = req.body;
  verifyToken(token)
    .then((decoded) => {
      const userId = decoded.id;
      return User
        .findById(userId);
    })
    .then((user) => {
      if (user) {
        return res.send({
          user,
        });
      }
      return Promise.reject(new Error('User not found'));
    })
    .catch((err) => {
      res.status(500).send({
        error: err || 'Error',
      });
    });
};

router.post('/signin', signIn);
router.post('/check-session-token', checkSessionToken);
module.exports = router;
