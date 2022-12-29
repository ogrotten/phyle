const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const pb = dbmgr.pb

exports.storeFiles = async (incoming) => {
	const autotag = await dbTags.autoTag(incoming)
	// const data = {
	// 	filename: 'test',
	// 	path: 'test',
	// 	tags_auto: '',
	// 	tags_manual: '',
	// 	object: 'JSON',
	// 	field: 'test',
	// }

	// const data = incoming.forEach((file) => ({
	// 	filename: file.name,
	// 	path: file.path,
	// 	tags_auto: file.tags_auto,
	// 	object: JSON.stringify(file),
	// 	field: '?',
	// }))

	// debugger
	// const record = await pb
	// 	.collection('files')
	// 	.create(data)
	// 	.catch((err) => console.log(`LOG..dbFiles: err`, err.data))

	const promises = incoming.map(async (file, idx) => {
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
	console.log(`LOG..dbFiles: inside`)
	const yarn = await pb.collection('files').getFullList(200 /* batch size */, {
		sort: 'tags_auto',
	})

	console.log(`LOG..dbFiles: yarn`, yarn)
}
