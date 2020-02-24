import express from 'express'
import productRouter from './product.router'
import userRouter from './user.router'
import poviderRouter from './provider.router'

const routers = express.Router();
routers.use('/products',productRouter)
routers.use('/signin', userRouter)
routers.use('/providers', poviderRouter)
module.exports = routers