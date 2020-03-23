const provider = require('../models/providers.model');
const log4js = require('log4js');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const fs = require('fs')

dotenv.config();
const logger = log4js.getLogger();
logger.level = "debug";

module.exports.addProvider = async function (req, res) {
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
    let providerInfo = req.body
    providerInfo.image = image
    const result = await provider.addProvider(providerInfo)   
    return res.status(200).jsonp(result)

}
module.exports.getProviders = async function (req, res) {
    const err = validationResult(req.query)
    if (!err.isEmpty()) {
        return res.status(422).jsonp(err.array());
    }
    if (Object.keys(req.query).length !== 0) {
        const result = await provider.getProviders(req.query)
        return res.status(200).json(result)
    }
    const result = await provider.getProviders()
    return res.status(200).json(result)
}
module.exports.getProvider = async function (req, res) {
    if (!req.query) {
        logger.error(`User registration request body is not exist`);
        return res.sendStatus(400);
    }
    const result = await provider.getProvider(req.query)
    return res.status(200).json(result)

}

module.exports.deleteProvider = async function (req, res) {
    if (!req.query) {
        logger.error(`User registration request body is not exist`);
        return res.sendStatus(400);
    }
    try{
        const result = await provider.deleteProvider(req.query)
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