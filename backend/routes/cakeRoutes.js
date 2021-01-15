import express from 'express'
import { getCakes, getCakeDetails } from '../controllers/cakeControllers.js'

const router = express.Router()

router.route('/').get(getCakes)

router.route('/:id').get(getCakeDetails)

export default router