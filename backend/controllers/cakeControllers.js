import asyncHandler from 'express-async-handler'
import Cake from '../models/cakeModel.js'

// @desc        Get all cakes
// @route       GET /api/cakes
// @privacy     Public
export const getCakes = asyncHandler(async (req, res) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1

  const count = await Cake.countDocuments()
  const cakes = await Cake.find().limit(pageSize).skip(pageSize * (page - 1))
  res.json({
    cakes, page, pages: Math.ceil(count / pageSize)
  })
})

// @desc        Get cake details
// @route       GET /api/cakes/:id
// @privacy     Public
export const getCakeDetails = asyncHandler(async (req, res) => {
  const id = req.params.id
  const cake = await Cake.findById(id)

  if (cake) {
    res.json(cake)
  } else {
    res.status(404)
    throw new Error('Cake not found.')
  }
})