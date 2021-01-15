import mongoose from 'mongoose'

const cakeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
}, {
  timestamps: true
})

const Cake = mongoose.model('Cake', cakeSchema)

export default Cake