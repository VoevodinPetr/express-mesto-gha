const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { createUser, login } = require('../controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validations');

const {
  validationUserId,
  validationUpdateUserProfile,
  validationUpdateUserAvatar,
} = require('../middlewares/validations');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validationUserId, getUser);

router.patch('/me', validationUpdateUserProfile, updateUserProfile);

router.patch('/me/avatar', validationUpdateUserAvatar, updateUserAvatar);

module.exports = router;
