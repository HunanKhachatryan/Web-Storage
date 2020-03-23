import express from 'express'
const productsRouter = express.Router();
import controller from '../controlers/product.controler';
import {check} from 'express-validator';

productsRouter.route('/')
    .post([check('productName').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Product names first simbol should be upper'),
            check('productPrice').matches(/^[1-9]{1}[0-9]{1,}$/).withMessage('Product price should be only numbers'),
            check('productDate').isISO8601("MM-DD-YYYY").withMessage('Date should be MM-DD-YYYY format '),
            check('expiration').isISO8601("MM-DD-YYYY").withMessage('The Expiration date should be MM-DD-YYYY format ')
        ],
        controller.addProducts)
        .delete(controller.deleteProduct)
productsRouter.route('/')
    .get([check('productId').isNumeric().withMessage("Product Id should be Alpha")],controller.getProducts)

module.exports = productsRouter;