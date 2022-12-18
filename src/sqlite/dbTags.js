const dbmgr = require('./dbmgr')
const db = dbmgr.db

const allTags = db.prepare('SELECT * FROM tags').all()

exports.auto = async (incoming) => {
	if (!incoming) return

	const toMatch = new RegExp(`(${allTags.map((e) => e.data).join('|')})`, 'ig')
	incoming.forEach((e) => {
		e.tags_auto = ' '
		const hold = e.name.match(toMatch)
		if (hold) e.tags_auto = Array.from(hold).join(',')
	})

	return incoming
}
