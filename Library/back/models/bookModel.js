const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    title:  String,

    author: String,
    
    publishYear: Number,
    
    category: String,
     
    bookDescription: String,
     
    imageURL:  String,
     
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Não lido", "Lido", "Lendo"],
      default: "Não lido",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Book
