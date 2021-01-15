import express from 'express'
import { addOrderItems, getOrders } from '../controllers/orderControllers.js'
import { protect } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(protect, getOrders).post(protect, addOrderItems)

export default router