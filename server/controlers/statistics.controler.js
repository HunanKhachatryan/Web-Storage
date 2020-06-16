const model = require('../models/statistics.model');
const log4js = require('log4js');
const dotenv = require('dotenv');
const {
    validationResult
} = require('express-validator');

dotenv.config();
const logger = log4js.getLogger();
logger.level = "debug";

module.exports.getStatistics = async function (req, res) {
    let response = {}
    response["products"] = await model.getBestSaledProductsByCount()
    response["shops"] = await model.getBestShopsByTotalCount()
    response["providers"] = await model.getBestProvidersByTotalCount()

    return res.status(200).json(response)

}
module.exports.getProducts = async function (req, res) {
    if (req.query) {
        if (req.query.getAs === "maxPrice") {
            const result = await model.getBestSaledProducts(req.query)
            return res.status(200).json(result)
        } else if (req.query.getAs === "maxCount") {
            const result = await model.getBestSaledProductsByCount(req.query)
            return res.status(200).json(result)
        }
    }
    const result = await model.getBestSaledProductsByCount()
    return res.status(200).json(result)

}
module.exports.addSale = async function (req, res) {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        console.log(err)
        return res.status(422).json(err.errors);
    }

    const result = await model.addProduct(req)
    return res.status(200).jsonp(result)

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
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}