const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
})

module.exports = User