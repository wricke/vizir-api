import mongoose from 'mongoose';

export const callSchema = mongoose.Schema({
  origin: {
    type: Number,
    required: true,
    unique: true,
  },
  destinys: {
    type: Array,
    required: true,
    unique: true,
    destiny: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.model('calls', callSchema);
