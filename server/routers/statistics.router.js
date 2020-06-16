import express from 'express'
const router = express.Router();
import controller from '../controlers/statistics.controler';
import {check} from 'express-validator';

router.route('/')
    .get(controller.getStatistics)

router.route('/products')
    .post([check('productId').isNumeric().withMessage('ProductId should be numeric'),
            check('shopId').isNumeric().withMessage('ShopId should be numeric'),
            check('saledDate').isISO8601("MM-DD-YYYY").withMessage('Date should be MM-DD-YYYY format '),
            check('providerId').isNumeric().withMessage('ProdviderId should be numeric')
        ],
        controller.addSale)
    .get(controller.getProducts)

router.route('/shops')
    .get(controller.getShops)
router.route('/providers')
    .get(controller.getProviders)
module.exports = router;