import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    totalPrice,
    paidAt
  } = req.body

  const order = new Order({
    user: req.user._id,
    orderItems, 
    shippingAddress,
    totalPrice,
    paidAt,
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
}) 

// @desc    Get all orders for logged in user
// @route   GET /api/orders
// @access  Private
export const getOrders = asyncHandler(async (req, res) => {
  const id = req.user._id

  const orders = await Order.find({ user: id }).sort({ paidAt: -1 })

  res.json(orders)
}) 

// @desc    Get an order by id
// @route   GET /api/orders/:id
// @access  Private
// export const getOrderDetails = asyncHandler(async (req, res) => {
//   const user = req.user._id
//   const id = req.params._id

//   const order = await Order.findOne({ user, id })

//   if (order) {
//     res.json(order)
//   } else {
//     res.status(404)
//     throw new Error('Order not found.')
//   }
// }) 