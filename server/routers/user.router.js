import express from 'express'
const userRouter = express.Router();
import controller from '../controlers/user.controler';
import {check} from 'express-validator';
console.log("xxx")
userRouter.route('/')
    .post([check('email').isEmail().withMessage('User email first simbol should be upper'),
            check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('Password should be have 1 number 1 upper case')
        ],
        controller.login)
module.exports = userRouter;