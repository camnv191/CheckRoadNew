import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  okCallback = () => {
    alert('okCallback')
}

errorCallback = () => {
    alert('errorCallback')
}
//warningDB
  static openDB() {
    db = SQLite.openDatabase({ name: 'ConnectDBwarningssss', location:1}, this.okCallback, this.errorCallback);
    return db;
  }


  static createWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "CREATE TABLE warning (Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon  BLOB, iconname TEXT )";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static createRecordWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "CREATE TABLE recordWarning (Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude REAL, longitude REAL, time NUMERIC, uid TEXT, note TEXT, FOREIGN KEY (name) REFERENCES warning(name))";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM warning";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getRecordWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM recordWarning";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static  async addWaring(name, icon, iconname) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warning(name, icon, iconname) VALUES (?,?,?)";
        console.log('ads')
        tx.executeSql(sql, [name, icon, iconname], (tx, results) => {
          console.log('success')
          resolve(results);
        });
      })
    });
  };

  static  async addRecordWaring(namewarning,latitude,longitude,time,uid,note) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warning(namewarning,latitude,longitude,time,uid,note) VALUES (?,?,?,?,?,?)";
        tx.executeSql(sql, [namewarning,latitude,longitude,time,uid,note], (tx, results) => {
          resolve(results);
        });
      })
    });
  };

  // static  async deleteWarning(value) {
  //   return await new Promise(function (resolve, reject){
  //     db.transaction(tx => {
  //       var sql = "DELETE FROM warning WHERE Id = ?";
  //       tx.executeSql(sql, [value], (tx, results)=>{ 
  //         resolve(results);
  //       });
  //     })
  //   });
  // };
  

  
  // static  async addWaringNew(value) {
  //   return await new Promise(function (resolve, reject){
  //     db.transaction(tx => {
  //       var sql = "INSERT INTO warning(value) VALUES (?)";
  //       tx.executeSql(sql, [value], (tx, results) => {
  //         resolve(results);
  //       });
  //     })
  //   });
  // };
  // static async query(sql) {
  //   return await new Promise(function (resolve, reject) {
  //     db.transaction(tx => {
  //       tx.executeSql(sql, [], (tx, results) => {
  //         resolve(results);
  //       });
  //     });
  //   });
  // };
  

}