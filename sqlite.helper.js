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
    db = SQLite.openDatabase({ name: 'ConnectRecordWarningDB', location:1}, this.okCallback, this.errorCallback);
    return db;
  }
//ConnectRecordWarningDB

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
        var sql = "CREATE TABLE recordWarning(Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude REAL, longitude REAL, time NUMERIC, uid TEXT, note TEXT, FOREIGN KEY (name) REFERENCES warning(name))";
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

  static getWarningAndRecordWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT warning.icon,warning.name, recordWarning.latitude, recordWarning.longitude FROM warning  INNER JOIN recordWarning ON  warning.name = recordWarning.name";
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
        tx.executeSql(sql, [name, icon, iconname], (tx, results) => {
          resolve(results);
          console.log(oke)
        });
      })
    });
  };

  static  async addRecordWaring(namewarning,latitude,longitude,time,uid,note) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO recordWarning(name,latitude,longitude,time,uid,note) VALUES (?,?,?,?,?,?)";
        tx.executeSql(sql, [namewarning,latitude,longitude,time,uid,note], (tx, results) => {     
          resolve(results);
        });
      })
    });
  };

}