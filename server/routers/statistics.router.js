import express from 'express'
const router = express.Router();
import controller from '../controlers/statistics.controler';

router.route('/products')
    .get(controller.getProducts)
router.route('/shops')
    .get( controller.getShops)
router.route('/providers')
    .get( controller.getProviders)
module.exports = router;