const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Кот',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'буйный',
    },
    avatar: {
      type: String,
      default: 'https://fonwall.ru/wallpaper/cat-eyes-cats.html',
    },

  },
);

module.exports = mongoose.model('user', userSchema);
