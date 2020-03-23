import express from 'express'
const shopRouter = express.Router();
import controller from '../controlers/shop.controler';
import {check} from 'express-validator';

shopRouter.route('/')
    .post([check('name').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Product names first simbol should be upper')
            // check('productPrice').matches(/^[1-9]{1}[0-9]{1,}$/).withMessage('Product price should be only numbers'),
            // check('productDate').isISO8601("MM-DD-YYYY").withMessage('Date should be MM-DD-YYYY format '),
            // check('expiration').isISO8601("MM-DD-YYYY").withMessage('The Expiration date should be MM-DD-YYYY format ')
        ],
        controller.addShop)
        .delete(controller.deleteShop)
shopRouter.route('/')
    .get([check('productId').isNumeric().withMessage("Product Id should be Alpha")],controller.getShops)

module.exports = shopRouter;