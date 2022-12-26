const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const pb = dbmgr.pb

exports.storeFiles = async (incoming) => {
	const autotag = await dbTags.autoTag(incoming)

	const data = {
		filename: 'test',
		path: 'test',
		tags_auto: 'RELATION_RECORD_ID',
		tags_manual: 'RELATION_RECORD_ID',
		object: 'JSON',
		field: 'test',
	}

	const record = await pb.collection('files').create(data)

	console.log(`conlog: record`, record)

	// const stmt = db.prepare(
	// 	`INSERT INTO files(filename, path, tags_auto, object) VALUES(?, ?, ?, ?)`
	// )
	// autotag.forEach((item) => {
	// 	stmt.run(item.name, item.path, item.tags_auto, JSON.stringify(item))
	// })
}

exports.getFiles = async () => {
	return await pb.collection('files').getFullList(200 /* batch size */, {
		sort: 'tag',
	})
}
