const router = require('express').Router();

router.use('/user/', require('./user_controller'));

module.exports = router;
