const dbmgr = require('./dbmgr')
const db = dbmgr.db

exports.storeFiles = async (incoming) => {
	// console.log(`conlog: incoming`, incoming)

	let values = ''
	incoming.forEach((item) => {
		// console.log(`conlog: item`, item)
		values += `(${item.name},${item.path},${item}),`
	})

	values = values.slice(0, -1)

	// const outgoing = db.exec(
	// 	`INSERT INTO files(filename, path) VALUES("Name of files", "Path of files")`
	// )
	// console.log(`conlog: outgoing`, outgoing)

	const stmt = db.prepare(`INSERT INTO files(filename, path) VALUES(?, ?)`)
	const info = stmt.run('Joey', 2)
	console.log(`conlog: info`, info)
}
