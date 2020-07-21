const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const { getUser, watchIsLater } = require('../controllers/user');

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);
router.route('/delete').delete(auth, userController.delete);
router.route('/tokenIsValid').post(userController.tokenIsValid);
router.route('/').get(auth, getUser);
router.route('/watchIsLater').put(auth, watchIsLater);

module.exports = router;
