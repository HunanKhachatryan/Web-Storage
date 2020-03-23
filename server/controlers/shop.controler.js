const shop = require('../models/shops.model');
const log4js = require('log4js');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const fs = require('fs')

dotenv.config();
const logger = log4js.getLogger();
logger.level = "debug";

module.exports.addShop = async function (req, res) {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        console.log(err)
        return res.status(422).json(err.errors);
    }
    let image = fs.readFileSync(req.files[0].path)
    fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })
    let shopInfo = req.body
    shopInfo.image = image
    const result = await shop.addShop(shopInfo)   
    return res.status(200).jsonp(result)

}
module.exports.getShops = async function (req, res) {
    const err = validationResult(req.query)
    if (!err.isEmpty()) {
        return res.status(422).jsonp(err.array());
    }
    if (Object.keys(req.query).length !== 0) {
        const result = await shop.getShops(req.query)
        return res.status(200).json(result)
    }
    const result = await shop.getShops()
    return res.status(200).json(result)
}
module.exports.getShop = async function (req, res) {
    if (!req.query) {
        logger.error(`User registration request body is not exist`);
        return res.sendStatus(400);
    }
    const result = await shop.getShop(req.query)
    return res.status(200).json(result)

}

module.exports.deleteShop = async function (req, res) {
    try{
        const result = await shop.deleteShop(req.query)
        return res.status(200).json(result)
    }catch(error){
        return res.status(500).json(error)
    }
   

}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}