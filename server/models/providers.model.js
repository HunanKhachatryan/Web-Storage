import {connection} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getProviders = function () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Providers', function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  module.exports.addProvider = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO Providers (??,??,??,??,??) VALUES (?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["name", "surname", "phone", "email","image", data.name, data.surname,  data.phone, data.email,data.image]);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          reject(error)
          return;
        }
        let response = {
          "message":"succesed",
          "insertId":results.insertId
        }
        console.log(response)
        resolve(response)
      });
    });
  }

  module.exports.updateProvider = function (data) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["Providers", "name", "surename", "address", "phone", "email", data.name,data.surename, data.address, data.phone, data.email]);
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
  module.exports.deleteProvider = function (params) {
    return new Promise((resolve, reject) => {
        let array = []
      for (const  i in params ) {
        array.push(i)
        array.push(params[i])
      }
  
      let selectQuery = 'DELETE  FROM Providers where ?? = ?';
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