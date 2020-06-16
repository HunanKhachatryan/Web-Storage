import {
    connection
} from './mysqlConnection'
import mysql from 'mysql'

module.exports.addProduct = function (data) {
    return new Promise(async (resolve, reject) => {
        let product = await this.getProductByID(data.body.productId)
        let productId = await this.getProductId(product)
        let productName = product.name
        let price = product.price
        console.log(data.body)
        console.log(product)
        console.log(productId)
        
        let insertQuery = 'INSERT INTO SaledProducts (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)';
        let query = mysql.format(insertQuery, ["productId", "name", "price", "saledDate", "provider", "shop", productId, productName, price, data.body.saledDate, data.body.providerId, data.body.shopId]);
        console.log(query)
        connection.query(query, (error, results) => {
            if (error) {
                console.error(error);
                reject(error)
                return;
            }
            let response = {
                "message": "successed",
            }
            resolve(response)
        });
    });
}

module.exports.getBestSaledProducts = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]

        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select id, name, price, image ,totalPrice, totalSaled from Product inner join (select productId, sum(price) as totalPrice, count(productId) as totalSaled from SaledProducts where saledDate BETWEEN ? AND ? Group by productId Order by totalPrice desc ) as TotalSaledProducts where id = productId";
        let query = mysql.format(insertQuery,[startDate,endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
                console.log(error)
            } else {
                console.log("test",results)
                resolve(results);
            }
        });
    });
}
module.exports.getBestSaledProductsByCount = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]
        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select id, name, price, image ,totalPrice, totalSaled from Product inner join TotalSaledProducts where id = productId";
        let query = mysql.format(insertQuery, [startDate, endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
                console.log(error)
            } else {
                resolve(results);
            }
        });
    });
}
module.exports.getProductByID = function (productId) {
    return new Promise((resolve, reject) => {
        let insertQuery = "Select * from Products where productId=?";
        let query = mysql.format(insertQuery, [productId]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports.getProductId = function (product) {
    return new Promise((resolve, reject) => {
        let insertQuery = "Select id from Product where name=? and price = ?";
        let query = mysql.format(insertQuery, [product.name, product.price]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].id);
            }
        });
    });
}

module.exports.getProviders = function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT DISTINCT * FROM Providers right join SaledProducts on Providers.providerId = SaledProducts.provider', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports.getBestProvidersByTotalPrice = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]
        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select providerId, name, surname, phone, email, totalPrice, image from Providers inner join( select provider , sum(price) totalPrice from SaledProducts where saledDate BETWEEN ? AND ? group by provider desc ) as BestProviders on providerId = provider";
        let query = mysql.format(insertQuery, [startDate, endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports.getBestProvidersByTotalCount = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]
        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select providerId, name, surname, phone, email, image, totalCount from Providers inner join( select provider , Count(provider) totalCount from SaledProducts where saledDate BETWEEN ? AND ? group by provider desc ) as BestProviders on providerId = provider";
        let query = mysql.format(insertQuery, [startDate, endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports.getProviderById = function (providerid) {
    return new Promise((resolve, reject) => {
        let insertQuery = "Select * from Providers where providerId=?";
        let query = mysql.format(insertQuery, providerid);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports.getBestShopsByTotalPrice = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]
        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select shopId, name, address, email, totalPrice, image from Shops inner join( select shop , sum(price) totalPrice from SaledProducts where saledDate BETWEEN ? AND ? group by shop desc ) as BestProviders on shopId = shop";
        let query = mysql.format(insertQuery, [startDate, endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports.getBestShopsByTotalCount = function (data) {
    return new Promise((resolve, reject) => {
        var date = new Date();
        let endDate = date.toISOString().split("T")[0]
        date.setMonth(date.getMonth() - 1)
        let startDate = date.toISOString().split("T")[0]
        if (data && data.startDate) {
            startDate = data.startDate
            if (data.endDate) {
                endDate = data.endDate
            }
        }
        let insertQuery = "select shopId, name, address, email, totalCount, image from Shops inner join( select shop , sum(shop) totalCount from SaledProducts where saledDate BETWEEN ? AND ? group by shop desc ) as BestProviders on shopId = shop";
        let query = mysql.format(insertQuery, [startDate, endDate]);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports.getShopById = function (providerid) {
    return new Promise((resolve, reject) => {
        let insertQuery = "Select * from Shops where shopId=?";
        let query = mysql.format(insertQuery, providerid);
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}