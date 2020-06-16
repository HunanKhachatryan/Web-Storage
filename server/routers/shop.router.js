import express from 'express'
const shopRouter = express.Router();
import controller from '../controlers/shop.controler';
import {check} from 'express-validator';

shopRouter.route('/')
    .post([check('name').matches(/^[A-Za-z0-9_]+( [A-Za-z0-9_]+)*$/).withMessage('Shop names dose not match wit regexp'),
            check('address').matches(/^[A-Za-z0-9_]+( [A-Za-z0-9_]+)*$/).withMessage('Address  dose not match wit regexp'),
            check('phone').isNumeric().withMessage('Phone should be only nmeric format '),
            check('email').isEmail().withMessage('Email value have no valid format')
        ],
        controller.addShop)
        .delete(controller.deleteShop)
shopRouter.route('/')
    .get([check('shopId').isNumeric().withMessage("Shop Id should be numeric")],controller.getShops)

module.exports = shopRouter;