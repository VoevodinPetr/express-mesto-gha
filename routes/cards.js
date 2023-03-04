const cardsRouter = require('express').Router();

const {
  getAllCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', createNewCard);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:id/likes', likeCard);

cardsRouter.delete('/:id/likes', dislikeCard);

module.exports = cardsRouter;
