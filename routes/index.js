const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validations');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не существует'));
});

module.exports = router;
