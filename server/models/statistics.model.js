import {connection} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getProducts = function (data) {
    return new Promise((resolve, reject) => {
        
        if (data.startDate === undefined) {
            console.log("sssss")
        }
        let insertQuery = "select name, count(name) as count from (select * from SaledProducts where saledDate BETWEEN ? AND ? ) as dd group by name order by count desc";
        let query = mysql.format(insertQuery, [data.startDate, data.endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
                console.log(error)
            } else {
                console.log(results)
                resolve(results);
            }
        });
    });
}
module.exports.getProductsByProfitability = function (data) {
    return new Promise((resolve, reject) => {
        if (data) {
            console.log("sssss")
        }
        let insertQuery = "select name,price * count(name) as  summary, count(name) as count from (select * from SaledProducts where saledDate BETWEEN ? AND ? ) as dd group by name, price order by summary desc";
        let query = mysql.format(insertQuery, [data.startDate, data.endDate]);
        console.log(query)
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
                console.log(error)
            } else {
                console.log(results)
                resolve(results);
            }
        });
    });
}
module.exports.getProviders = function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM SaledProducts', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports.getShops = function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Shops', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}