const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  return Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(new NotFound(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => {
      if (card) {
        const owner = card.owner.toString();
        if (owner === req.user._id) {
          return card.remove();
        }
        return Promise.reject(
          new ForbiddenError('Запрещено удалять чужие карточки'),
        );
      }
      return Promise.reject(new NotFound('Карточка не найдена'));
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена безвозвратно!' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некоректный id'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  ).orFail(new NotFound(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки лайка'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  ).orFail(new NotFound(`Карточка с указанным _id ${cardId} не найдена`))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
        return;
      }
      next(err);
    });
};
