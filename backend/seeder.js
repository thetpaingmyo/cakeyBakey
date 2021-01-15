import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/userModel.js'
import Cake from './models/cakeModel.js'
import Order from './models/orderModel.js'
import users from './data/users.js'
import cakes from './data/cakes.js'
import colors from 'colors'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Cake.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleCakes = cakes.map(cake => ({ ...cake, user: adminUser }))
    
    await Cake.insertMany(sampleCakes)
    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Cake.deleteMany()
    await Order.deleteMany()

    console.log('Data deleted!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}