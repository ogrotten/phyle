const dbmgr = require('./dbmgr')
const pb = dbmgr.pb

async function getTags() {
	allTags = await pb.collection('tags').getFullList(200 /* batch size */, {
		sort: 'tag',
	})
	return allTags.map((t) => ({ ...t, in: false }))
}
let allTags = getTags()

exports.autoTag = async (incoming) => {
	if (!incoming) return

	const toMatch = new RegExp(`(${allTags.map((e) => e.data).join('|')})`, 'ig')
	incoming.forEach((e) => {
		e.tags_auto = []

		const hold = e.name.toLowerCase().match(toMatch)
		if (!hold) return

		// console.log(`conlog: hold`, hold)
		const tagIds = allTags
			.filter((tag) => {
				// console.log(`conlog: hold`, hold, tag.data)
				return hold?.includes(tag.data)
			})
			.map((e) => e.id)

		// console.log(`conlog: tagIds`, tagIds)

		e.tags_auto = tagIds
	})

	return incoming
}

exports.allTags = allTags
exports.getTags = getTags
