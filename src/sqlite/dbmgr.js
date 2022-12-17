const db = require('better-sqlite3')('./src/sqlite/phyle.db', {
	fileMustExist: true,
	verbose: console.log,
})
// const db = new sqlite
exports.db = db

console.log(`conlog: sqlite`, db.open, db.name)

// db.run(
// 	'INSERT INTO files (filename, path) VALUES("name of file", "entire path")'
// )
