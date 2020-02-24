import {connection} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getUsers = function () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Users', function (error, results) {
        if (error) {
          reject(error);
        } else {
          console.log(results)
          resolve(results);
        }
      });
    });
  }
  module.exports.getUser = function (user) {
    return new Promise((resolve, reject) => {
      let userData = [user.email, user.password]
      let selectQuery = 'SELECT * FROM Users where email=?';
      let query = mysql.format(selectQuery, userData);
      connection.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  module.exports.updateUser = function (user) {
    return new Promise((resolve, reject) => {
      let userData = [user.accessTocken,user.date, user.email]
      let selectQuery = 'UPDATE Users Set accessTocken = ?, accessTokenDate = ? where email=?';
      let query = mysql.format(selectQuery, userData);
      connection.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      let createEvent = "Create Event IF NOT EXISTS clearToken ON SCHEDULE EVERY 1 Hour  do update Users set accessTocken = NULL where accessTokenDate < time(now()) - Interval 1 Hour;"
      connection.query(mysql.format(createEvent), function (error, result) {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          console.log(result)
          resolve(result);
        }
      });
      let globalSchedul = "set global event_scheduler = on;"
      connection.query(mysql.format(globalSchedul), function (error, result) {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          console.log(result)
          resolve(result);
        }
      });

      //Create Event IF NOT EXISTS removeProduct ON SCHEDULE EVERY 1 Day  do Delete From Products where expiration < time(now());
      
    });
  }
  