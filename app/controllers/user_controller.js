const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

const showUsers = (req, res) => {
  User
    .fetchAll()
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
    name, password, username, isAdmin,
  } = req.body;
  const userPassword = bcrypt.hashSync(password, 10);
  User
    .forge({
      user_name: name,
      user_username: username,
      user_password: userPassword,
      user_isAdmin: isAdmin,
    })
    .save(null, { method: 'insert' })
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
    .where('user_id', id)
    .destroy()
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
    name, username, isAdmin, password,
  } = req.body;
  let setPassword = {};
  if (password) {
    setPassword = {
      user_password: bcrypt.hashSync(password, 10),
    };
  }
  const data = {
    user_name: name,
    user_username: username,
    user_isAdmin: isAdmin,
    ...setPassword,
  };
  User
    .where('user_id', id)
    .fetch()
    .then(userFound => userFound
      .save(data))
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
