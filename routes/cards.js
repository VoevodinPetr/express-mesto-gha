const router = require('express').Router();

const {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateNewCard,
  validationCardId,
} = require('../middlewares/validations');

router.get('/', getCards);

router.post('/', validationCreateNewCard, createNewCard);

router.delete('/:cardId', validationCardId, deleteCard);

router.put('/:cardId/likes', validationCardId, likeCard);

router.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = router;
