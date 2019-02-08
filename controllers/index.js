const router = require('express').Router();

router.use('/user/', require('./user_controller'));
router.use('/event/', require('./event_controller'));
router.use('/auth', require('./authentication_controller'));

module.exports = router;
