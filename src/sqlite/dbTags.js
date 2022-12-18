const dbmgr = require('./dbmgr')
const db = dbmgr.db

const allTags = db.prepare('SELECT * FROM tags').all()

exports.auto = async (incoming) => {
	const toMatch = new RegExp(`(${allTags.map((e) => e.data).join('|')})`, 'ig')
	let outgoing = incoming.map((e) => {
		return { tags: e.name.match(toMatch), name: e.name }
	})
	console.log(`conlog: outgoing`, outgoing)
}
