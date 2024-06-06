import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  profile: { type: String }
});

const User = mongoose.model('User', userSchema);

export { User };
