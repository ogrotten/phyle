const dbmgr = require('./dbmgr')
const db = dbmgr.db

const allTags = db.prepare('SELECT rowid,name,data,type FROM tags').all()

exports.autoTag = async (incoming) => {
	if (!incoming) return

	const toMatch = new RegExp(`(${allTags.map((e) => e.data).join('|')})`, 'ig')

	incoming.forEach((e) => {
		e.tags_auto = ' '

		const hold = e.name.toLowerCase().match(toMatch)
		if (!hold) return

		// console.log(`conlog: hold`, hold)
		const tagIds = allTags
			.filter((tag) => {
				console.log(`conlog: hold`, hold, tag.data)
				return hold?.includes(tag.data)
			})
			.map((e) => e.rowid)

		console.log(`conlog: tagIds`, tagIds)

		e.tags_auto = Array.from(hold).join(',')
	})

	return incoming
}

exports.getTags = () => {
	return allTags.map((t) => ({ ...t, in: false }))
}
