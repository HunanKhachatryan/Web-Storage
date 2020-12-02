import {connection} from './mysqlConnection'
import mysql from 'mysql'

  module.exports.addImage = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?)';
      let query = mysql.format(insertQuery, ["Products", "name", "price", "date", "expiration","image", data.name, data.price, data.date, data.expiration,  ]);
      connection.query(query, (error, results) => {
        if (error) {
          reject(error)
          return;
        }
        let respons = {
          "message":"successed",
        }
        resolve(respons)
      });
    });
  }
  
