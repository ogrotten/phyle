const dbmgr = require('./dbmgr')
const db = dbmgr.db

exports.storeFiles = (incoming) => {
	const values = ''
	incoming.forEach((item) => {
		values += `(${item.name},${item.path}),`
	})

	values = values.slice(0, -1) + ';'

	const sql = `INSERT INTO files (filename, path) VALUES ${values}`
	let send = db.run(sql)
	let res = send.all()
	return res
}
