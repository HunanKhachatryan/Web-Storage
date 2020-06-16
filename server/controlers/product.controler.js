const product = require('../models/products.model');
const log4js = require('log4js');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const fs = require('fs')

dotenv.config();
const logger = log4js.getLogger();
logger.level = "debug";

module.exports.addProducts = async function (req, res) {  
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(422).json(err.errors);
    }
    let image = fs.readFileSync(req.files[0].path)
    fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })
    let productInfo = req.body
    productInfo.productImage = image
    const result = await product.addProduct(productInfo)    
    return res.status(200).json(result)

}
module.exports.getProducts = async function (req, res) {
    const err = validationResult(req.query)
    if (!err.isEmpty()) {
        return res.status(422).jsonp(err.array());
    }
    if (Object.keys(req.query).length !== 0) {
        const result = await product.getProduct(req.query)
        return res.status(200).json(result)
    }
    const result = await product.getProducts()
    return res.status(200).json(result)
}
module.exports.getProduct = async function (req, res) {
    if (!req.query) {
        logger.error(`User registration request body is not exist`);
        return res.sendStatus(400);
    }
    const result = await product.getProduct(req.query)
    return res.status(200).json(result)

}
module.exports.deleteProduct = async function (req, res) {
    if (!req.query) {
        logger.error(`Product ID is not exist`);
        return res.sendStatus(400);
    }
    try{
        const result = await product.deleteProduct(req.query)
        return res.status(200).json(result)
    }catch(error){
        return res.status(404).json(error)
    }
   

}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}