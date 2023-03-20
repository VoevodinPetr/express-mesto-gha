const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUserProfile,
  validationUpdateUserAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validationUserId, getUser);

router.patch('/me', validationUpdateUserProfile, updateUserProfile);

router.patch('/me/avatar', validationUpdateUserAvatar, updateUserAvatar);

module.exports = router;
