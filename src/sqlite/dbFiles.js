const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const db = dbmgr.db

exports.storeFiles = async (incoming) => {
	const autotag = dbTags.auto(incoming)

	const stmt = db.prepare(
		`INSERT INTO files(filename, path, object) VALUES(?, ?, ?)`
	)
	incoming.forEach((item, idx) => {
		stmt.run(item.name, item.path, JSON.stringify(item))
	})
}
