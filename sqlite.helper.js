import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  okCallback = () => {
    alert('okCallback')
}

errorCallback = () => {
    alert('errorCallback')
}

  static openDB() {
    db = SQLite.openDatabase({ name: 'CheckRoadDBS', location:1}, this.okCallback, this.errorCallback);
    return db;
  }


  static createWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "CREATE TABLE warning (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon  BLOB)";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static createRecordWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "CREATE TABLE recordWarning(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude REAL, longitude REAL, time NUMERIC, uid TEXT, note TEXT, FOREIGN KEY (name) REFERENCES warning(name))";
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
  static getWarningName = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT name FROM warning";
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


  static  async addWaring(name, icon) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warning(name, icon) VALUES (?,?)";
        tx.executeSql(sql, [name, icon], (tx, results) => {
          resolve(results);
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

  static getByCheckbox = (args)  => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT warning.name, warning.icon, recordWarning.latitude, recordWarning.longitude  FROM warning INNER JOIN recordWarning ON warning.name = recordWarning.name";
        if(args && args.length > 0) {
          sql += ` WHERE ${args.map(v => `warning.name = '${v}'`).join(" OR ")}`;
        }
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

}