const model = require('../models/statistics.model');
const log4js = require('log4js');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');

dotenv.config();
const logger = log4js.getLogger();
logger.level = "debug";

module.exports.getProducts = async function (req, res) {
    // const err = validationResult(req.query)
    // if (!err.isEmpty()) {
    //     return res.status(422).jsonp(err.array());
    // }    
    console.log("+++++",req.query)

    if (req.query.profitability === "true") {
        const result = await model.getProductsByProfitability(req.query)
        return res.status(200).json(result)
    }
    const result = await model.getProducts(req.query)
    return res.status(200).json(result)
    
}
module.exports.getShops = async function (req, res) {
    const err = validationResult(req.query)
    if (!err.isEmpty()) {
        return res.status(422).jsonp(err.array());
    }
    if (Object.keys(req.query).length !== 0) {
        const result = await model.getShops(req.query)
        return res.status(200).json(result)
    }
    const result = await model.getShops()
    return res.status(200).json(result)
}
module.exports.getProviders = async function (req, res) {
    const err = validationResult(req.query)
    if (!err.isEmpty()) {
        return res.status(422).jsonp(err.array());
    }
    if (Object.keys(req.query).length !== 0) {
        const result = await model.getProviders(req.query)
        return res.status(200).json(result)
    }
    const result = await model.getProviders()
    return res.status(200).json(result)
}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}