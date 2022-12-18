const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const db = dbmgr.db

exports.storeFiles = async (incoming) => {
	const autotag = await dbTags.auto(incoming)
	// console.log(`conlog: autotag`, autotag)

	const stmt = db.prepare(
		`INSERT INTO files(filename, path, tags_auto, object) VALUES(?, ?, ?, ?)`
	)
	autotag.forEach((item) => {
		stmt.run(item.name, item.path, item.tags_auto, JSON.stringify(item))
	})
}
