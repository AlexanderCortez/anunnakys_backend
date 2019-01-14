const router = require('express').Router();

router.use('/user/', require('./user_controller'));
// router.use('/event/', require('./event_controller'));

module.exports = router;
