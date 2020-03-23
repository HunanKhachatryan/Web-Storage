import user from './../models/users.model'
import jwt from 'jsonwebtoken'
const config = require('./../config/config')
module.exports.login = async function (req, res) {
    if (req.body) {
        const email = req.body.email;
        const password = req.body.password
        if (email && password) {
            try {
                const info = await user.getUser(req.body)
                if (info.length == 0) {
                    return res.status(402).json({
                        message: "User not found"
                    })
                }

                if (info[0].email === email && info[0].password === password) {
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: config.tokenLife
                    })
                    const response = {
                        "status": "Logged in",
                        "expiredTime": 3600,
                        "accessToken": token
                    }
                    const now = new Date()
                    const date = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
                    const result = await user.updateUser({
                        email: email,
                        accessTocken: token,
                        date: date
                    })
                    return res.status(200).json(response)
                }else {
                    const response = {
                        "message": "User not found"
                    }
                    return res.status(401).json(response)
                }

            } catch (err) {
                console.log(`Error to login user: ${err}`);
                return res.status(204).json(err);
            }
        } else {
            console.log(`Not valid user email or password to login, email: ${email}, password : ${password}`);
            return res.status(403).json({
                message: "Not valid email or password"
            });
        }
    } else {
        console.log(`Login request body is empty`);
        return res.status(202).json({
            message: "Empty data!"
        })
    }
}