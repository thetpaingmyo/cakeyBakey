import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import cakeRoutes from './routes/cakeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import colors from 'colors'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/cakes', cakeRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/api', (req, res) => {
    res.send('API is running!')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, () => console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold))