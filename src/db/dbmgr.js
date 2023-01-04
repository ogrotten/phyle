const PocketBase = require('pocketbase/cjs')

const pb = new PocketBase('http://127.0.0.1:8090')

const authData = pb.admins.authWithPassword('phyle@phyle.phyle', 'phylephyle')

exports.pb = pb
exports.authData = authData

/* SQLite
// const db = require('better-sqlite3')('./src/sqlite/phyle.db', {
// 	fileMustExist: true,
// })
// // const db = new sqlite
// exports.db = db

// console.log(`conlog: sqlite`, db.open, db.name)

// db.run(
// 	'INSERT INTO files (filename, path) VALUES("name of file", "entire path")'
// )
 
  */
