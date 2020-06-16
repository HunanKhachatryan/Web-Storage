import express from 'express'
const providerRouter = express.Router();
import controller from '../controlers/provider.controler';
import {check} from 'express-validator';

providerRouter.route('/')
    .post([check('name').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Provider names dose not match wit regexp'),
            check('surname').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Provider surname dose not match wit regexp'),
            check('phone').matches(/^[1-9]{1}[0-9]{1,}$/).withMessage('Phone should be numeric'),
            check('email').isEmail().withMessage('Email value have no valid format ')
        ],
        controller.addProvider)
        .delete(controller.deleteProvider)
providerRouter.route('/')
    .get([check('providerId').isNumeric().withMessage("Provider Id should be numeric")],controller.getProviders)

module.exports = providerRouter;