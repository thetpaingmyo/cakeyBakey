import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      cake: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cake' },
    }
  ],
  shippingAddress: {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
  },
  totalPrice: { type: Number, required: true, default: 0.0 },
  paidAt: { type: Date, default: Date.now },
}, {
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order