const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/mongo_mappers/user');

const showUsers = (req, res) => {
  User
    .find()
    .then((users) => {
      res.status(200).send({
        users,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error retrieving users',
      });
    });
};

const createUser = (req, res) => {
  const {
    name, password, username, role,
  } = req.body;
  const userPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    username,
    password: userPassword,
    role,
  });
  newUser
    .save()
    .then((user) => {
      res.send({
        message: 'User created sucessfully',
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error adding user',
      });
    });
};

const removeUser = (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => {
      if (user) {
        return user
          .remove();
      }
      return Promise.reject(new Error('User not found'));
    })
    .then(() => {
      res.send({
        message: 'User removed successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error removing user',
      });
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    name, username, role, password,
  } = req.body;
  let setPassword = {};
  if (password) {
    setPassword = {
      password: bcrypt.hashSync(password, 10),
    };
  }
  const data = {
    name,
    username,
    role,
    ...setPassword,
  };
  User
    .findById(id)
    .then((user) => {
      if (user) {
        user.set(data);
        return user
          .save();
      }
      return Promise.reject(new Error('User not found'));
    })
    .then((user) => {
      res.send({
        message: 'User updated successfully',
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error updating user',
      });
    });
};

router.get('/', showUsers);
router.post('/', createUser);
router.delete('/:id', removeUser);
router.put('/:id', updateUser);
module.exports = router;