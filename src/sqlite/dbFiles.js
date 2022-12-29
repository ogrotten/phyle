const dbmgr = require('./dbmgr')
const dbTags = require('./dbTags')
const pb = dbmgr.pb

exports.storeFiles = async (incoming) => {
	debugger
	const autotag = await dbTags.autoTag(incoming)
	const data = {
		filename: 'test',
		path: 'test',
		tags_auto: '',
		tags_manual: '',
		object: 'JSON',
		field: 'test',
	}

	// const record = await pb.collection('files').create(data)

	console.log(`conlog: record`, record)
}

exports.getFiles = async () => {
	console.log(`LOG..dbFiles: inside`)
	const yarn = await pb.collection('files').getFullList(200 /* batch size */, {
		sort: 'tags_auto',
	})

	console.log(`LOG..dbFiles: yarn`, yarn)
}
