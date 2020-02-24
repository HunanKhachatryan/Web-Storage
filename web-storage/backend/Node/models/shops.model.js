import {connection} from './mysqlConnection'
import mysql from 'mysql'

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


  module.exports.addShop = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
      let query = mysql.format(insertQuery, ["Shops", "name", "address", "phone", "email", data.name, data.address, data.phone, data.email]);
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

  module.exports.updateShop = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
      let query = mysql.format(insertQuery, ["Shops", "name", "address", "phone", "email", data.name, data.address, data.phone, data.email]);
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