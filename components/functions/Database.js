import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("jaworski-bartosz-4ia1.db");

class Database {
    static createTable() {
        db.transaction(tx => {
            tx.executeSql("DROP TABLE alerts;");
            tx.executeSql("CREATE TABLE IF NOT EXISTS alerts (id integer primary key not null, hour text, monday number, tuesday number, wednesday number, thursday number, friday number, saturday number, sunday number, active number);");

        });
    }
    static add() {
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO alerts (hour, monday, tuesday, wednesday, thursday, friday, saturday, sunday, active) values ('00:00', 0, 0, 1, 1, 0, 0, 0, 1)");
            },
        )
    }
    static setValue(index, key, value) {
        db.transaction(
            tx => {
                tx.executeSql(`UPDATE alerts SET ${key} = ${value} where id = ${index}`);
            },
        )
    }
    static getAll() {
        const query = "SELECT * FROM alerts";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                //console.log(JSON.stringify(results.rows))
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }
    static removeByKey(key){
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM alerts WHERE id = ${key}`)
        })
    }
    static remove() {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM alerts;");
        });

    }

}

export default Database