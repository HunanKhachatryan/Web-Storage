  import {connection} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getProducts = function () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Products', function (error, results) {
        if (error) {
          reject(error);
        } else {
          const result = [];
          const map = new Map();
          for (const item of results) {
              if(!map.has(item.name)){
                  map.set(item.name, true);    // set any value to Map
                  let newItem = item
                  newItem.count = 1
                  result.push(newItem);
              }else{
                result.forEach(element => {
                  if (element.name === item.name ){
                    element.count += 1
                  }
                })
              }
          }
          resolve(result);
        }
      });
    });
  }
  module.exports.getProduct = function (params) {
    return new Promise((resolve, reject) => {
      let array = []
      for (const  i in params ) {
        array.push(i)
        array.push(params[i])
      }
  
      let selectQuery = 'SELECT * FROM Products where ?? = ?';
      let query = mysql.format(selectQuery, array);
      console.log(query)
      connection.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          const result = [];
          const map = new Map();
          for (const item of results) {
              if(!map.has(item.name)){
                  map.set(item.name, true);    // set any value to Map
                  let newItem = item
                  newItem.count = 1
                  result.push(newItem);
              }else{
                result.forEach(element => {
                  if (element.name === item.name ){
                    element.count += 1
                  }
                })
              }
          }
          resolve(result);
        }
      });
    });
  }
  module.exports.addProduct = function (data) {
    return new Promise((resolve, reject) => {
      console.log(data.productImage)
      
      let insertQuery = 'INSERT INTO Products (??,??,??,??,??) VALUES (?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["name", "price", "date", "expiration","image", data.productName, data.productPrice, data.productDate, data.expiration,data.productImage]);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
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
  
  module.exports.updateProduct = function (data,params) {
    return new Promise((resolve, reject) => {
      let queryParams = []
      for (const i in data ) {
        queryParams.push(i)
        queryParams.push(data[i])
      }
      for (const i in params ) {
        queryParams.push(i)
        queryParams.push(params[i])
      }
      
      let insertQuery = 'UPDATE Products SET ?? = ? WHERE ?? = ?';
      let query = mysql.format(insertQuery, queryParams);
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
  module.exports.deleteProduct = function (params) {
    return new Promise((resolve, reject) => {
        let array = []
      for (const  i in params ) {
        array.push(i)
        array.push(params[i])
      }
  
      let selectQuery = 'DELETE  FROM Products where ?? = ?';
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