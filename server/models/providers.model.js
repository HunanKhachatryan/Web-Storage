import {
  connection
} from './mysqlConnection'
import mysql from 'mysql'

module.exports.getProviders = function () {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Providers where isEmploy=true', function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
module.exports.addProvider = function (data) {
  return new Promise(async (resolve, reject) => {
      const res = await this.getProviderByPassport(data.passportId)
      if (res !== undefined) {
        let response = {
          "message":""
        }
        if (res.isEmploy === 1){
          response["message"] = "The provider with passportId(" + data.passportId + ") already exists"
          return resolve(response)
        }
        if (res.name !== data.name || res.surname !== data.surname) {
          response["message"] = "The provider with passportId(" + data.passportId + ") already exists check your name or surname"
          response["errorCode"] = 205
          return resolve(response)
        }
        const reqData = {
          "isEmploy": true,
          "providerId": res.providerId
        }

        let result = await this.updateProviderStatus(reqData)
        if (result["message"] === "successed"){
          response["message"] = "The provider status with passportId(" + data.passportId + ") updated"
        }
        resolve(response)
      } else {
      let insertQuery = 'INSERT INTO Providers (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)';
      let query = mysql.format(insertQuery, ["name", "surname", "phone", "email", "isEmploy", "passportId", "image", data.name, data.surname, data.phone, data.email, true, data.passportId, data.image]);
      connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          reject(error)
          return;
        }
        let response = {
          "message": "succesed",
          "insertId": results.insertId
        }
        resolve(response)
      });
    }
  });
}
module.exports.getProviderByPassport = function (passportId) {
  return new Promise((resolve, reject) => {
    let selectQuery = 'SELECT * FROM Providers WHERE passportId = ?';
    let query = mysql.format(selectQuery, passportId);
    connection.query(query, function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}
module.exports.updateProviderStatus = function (data) {
  return new Promise((resolve, reject) => {
    let insertQuery = 'Update Providers set  isEmploy = ? where providerId = ?';
    let query = mysql.format(insertQuery, [data.isEmploy, data.providerId]);
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

module.exports.deleteProvider = function (params) {
  return new Promise((resolve, reject) => {
    let array = []
    for (const i in params) {
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
        "message": "successed",
        results
      }
      resolve(respons)
    });
  });
}
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
function isArrayEmpty(array) {
      if(obj.hasOwnProperty(key)){
        return false;
      }
  return true;
}