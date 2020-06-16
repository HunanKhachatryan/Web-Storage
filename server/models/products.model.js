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
  
      let selectQuery = 'SELECT * FROM Products WHERE ?? = ?';
      let query = mysql.format(selectQuery, array);
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
      console.log(data)
      this.addProductInProduct(data)
      let insertQuery = 'INSERT INTO Products (??,??,??,??,??) VALUES (?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["name", "price", "date", "expiration","image", data.productName, data.productPrice, data.productDate, data.expiration,data.productImage]);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          reject(error)
          return;
        }
        let response = {
          "message":"successed",
        }
        resolve(response)
      });
    });
  }
  module.exports.addProductInProduct = function (data) {
    return new Promise( async (resolve, reject) =>  {
      let product = await this.getProductFromProduct(data) 
      if(product === undefined){
        let insertQuery = 'INSERT INTO Product (??,??,??) VALUES (?,?,?)';
        let query = mysql.format(insertQuery, ["name", "price", "image", data.productName, data.productPrice, data.productImage]);
        connection.query(query, (error, results) => {
          if (error) {
            console.error(error);
            reject(error)
            return;
          }
          resolve(results)
        });
      }
    });
  }
  module.exports.getProductFromProduct =  function (product) {
    return new Promise((resolve, reject) => {
  
      let selectQuery = 'SELECT * FROM Product WHERE name = ? and price = ?';
      let query = mysql.format(selectQuery, [product.productName, product.productPrice]);
      connection.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
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
  
      let selectQuery = 'DELETE  FROM Products WHERE ?? = ?';
      let query = mysql.format(selectQuery, array);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error, "error");
          reject(error)
          return;
        }
        let respons = {}
        if (results.affectedRows === 1){
          respons = {
            "message":"success"
          }
          resolve(respons)
        }else{
          respons = {
            "errorCode":"404",
            "message":"productId not found"
          }
          reject(respons)
        }
      });
    });
  }
        //Create Event IF NOT EXISTS removeProduct ON SCHEDULE EVERY 1 Day  do Delete From Products where expiration < time(now());