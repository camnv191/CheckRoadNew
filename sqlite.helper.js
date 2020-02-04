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
    db = SQLite.openDatabase({ name: 'connectDB', createFromLocation: '~www/warning.db' }, this.okCallback, this.errorCallback);
    return db;
  }

  static getWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM warninginfo";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getWarningByName = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM warning";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static  async deleteWarning(value) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "DELETE FROM warning WHERE value = ?";
        console.log('delete complete')
        tx.executeSql(sql, [], (tx, results)=>{
          resolve(results);
        });
      })
    });
  };
  

  static  async addWaring(value,range,latitude,longitude) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warninginfo(value, range, latitude, longitude) VALUES (?,?,?,?)";
        tx.executeSql(sql, [value, range, latitude, longitude], (tx, results) => {
          resolve(results);
        });
      })
    });
  };
  static  async addWaringNew(value) {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warning(value) VALUES (?)";
        tx.executeSql(sql, [value], (tx, results) => {
          resolve(results);
        });
      })
    });
  };
  static async query(sql) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  

}