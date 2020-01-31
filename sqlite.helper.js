import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  static okCallback = () => {
    // alert('okCallback')
  }

  static errorCallback = (error) => {
    alert('errorCallback: ' +  error)
  }

  static openDB() {
    db = SQLite.openDatabase({name: "db_doctor", location: 1}, this.okCallback, this.errorCallback);
    return db;
  }

  static getHospital = (hospitalName) => {
    hospitalName = hospitalName || '';
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM hospital WHERE name LIKE '%"+hospitalName+"%'";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  // static getAppointmentWaiting = (hospitalName) =>{
  //   return new Promise(function (resolve, reject) {
  //     db.transaction(tx => {
  //       let sql = "SELECT * FROM hospital WHERE name like '%"+hospitalName+"%'";
  //       tx.executeSql(sql, [], (tx, results) => {
  //         resolve(results);
  //       });
  //     });
  //   });
  // };
  static  async addHospital(domain, username, hospitalName, password)  {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO hospital(id, name, domain, user, password) VALUES (?,?,?,?,?)";
        tx.executeSql(sql, [domain, hospitalName, domain, username, password], (tx, results) => {
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