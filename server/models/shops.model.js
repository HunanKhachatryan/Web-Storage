import {connection} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getShops = function () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Shops where isCustomer=true', function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  module.exports.addShop = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO Shops (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["name", "address", "phone", "email","isCustomer","image", data.name, data.address, data.phone, data.email,true, data.image]);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          reject(error)
          return;
        }
        let respons = {
          "message":"succesed",
          "insertId":results.insertId
        }
        resolve(respons)
      });
    });
  }

module.exports.updateShopStatus = function (data) {
  return new Promise((resolve, reject) => {
    let insertQuery = 'Update Shops set  isCustomer = ? where shopId = ?';
    let query = mysql.format(insertQuery, [data.isCostomer, data.shopId]);
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        reject(error)
        return;
      }
      let respons = {
        "message": "successed"
      }
      resolve(respons)
    });
  });
}

  module.exports.deleteShop = function (params) {
    return new Promise((resolve, reject) => {
        let array = []
      for (const  i in params ) {
        array.push(i)
        array.push(params[i])
      }
  
      let selectQuery = 'DELETE  FROM Shops where ?? = ?';
      let query = mysql.format(selectQuery, array);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          reject(error)
          return;
        }
        let respons = {
          "message":"success",
          results
        }
        resolve(respons)
      });
    });
  }