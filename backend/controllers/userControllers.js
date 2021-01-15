import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc        Auth user and get token
// @route       POST /api/users/login
// @privacy     Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    }) 
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
  res.json(cakes)
})

// @desc        Register user and get token
// @route       POST /api/users
// @privacy     Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('A user with that email already exists.')
  }
  const user = await User.create({ name, email, password })
  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

// @desc        Update user and get token
// @route       PUT /api/users/update
// @privacy     Private
// export const updateUser = asyncHandler(async (req, res) => {
//   const { name, email } = req.body

//   const user = await User.findById(req.user._id)
//   if (user) {
//     user.name = name || user.name
//     user.email = email || user.email
//     const updatedUser = await user.save()
    
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id)
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found.')
//   }
// })
