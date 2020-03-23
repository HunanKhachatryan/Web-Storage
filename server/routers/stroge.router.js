import express from 'express'
import productRouter from './product.router'
import userRouter from './user.router'
import poviderRouter from './provider.router'
import shopRouter from './shop.router'
import statistic from './statistics.router'

const routers = express.Router();
routers.use('/products',productRouter)
routers.use('/signin', userRouter)
routers.use('/providers', poviderRouter)
routers.use('/shops',shopRouter)
routers.use('/statistics', statistic)
module.exports = routers