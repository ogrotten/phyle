const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const pb = dbmgr.pb

exports.storeFiles = async (incoming) => {
	const promises = incoming.map(async (file) => {
		const data = {
			filename: file.name,
			path: file.path,
			tags_auto: file.tags_auto,
			object: JSON.stringify(file),
			field: '?',
		}

		const record = await pb
			.collection('files')
			.create(data)
			.catch((err) => console.log(`LOG..dbFiles: err`, err.data))

		return record
	})

	return Promise.all(promises)
}

exports.getFiles = async () => {
	return await pb.collection('files').getFullList(200 /* batch size */, {
		sort: 'tags_auto',
	})
}
