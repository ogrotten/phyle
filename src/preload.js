const { readdir } = require('fs/promises')
const path = require('path')
const { contextBridge } = require('electron')
const dirTree = require('directory-tree')
const nodeDiskInfo = require('node-disk-info')

// windows network drives
let networkDrive = require('windows-network-drive')

const currentDirectory = () => {
	return process.cwd()
}

const directoryContents = async (incoming) => {
	let results = await readdir(incoming, { withFileTypes: true })
	return results.map((entry) => ({
		name: entry.name,
		type: entry.isDirectory() ? 'directory' : 'file',
	}))
}

const getTree = async (incoming) => {
	console.log('incoming', incoming)
	const absolutePath = path.resolve(incoming)
	console.log('incoming', absolutePath)
	return dirTree(absolutePath)
}

const getVolumes = async () => {
	let volumes = {
		data: [],
		simple: [],
	}
	await nodeDiskInfo
		.getDiskInfo()
		.then((disks) => {
			volumes = disks.map((e) => e._mounted)
		})
		.catch((reason) => {
			console.error(reason)
		})
	// await networkDrive.list().then(drives => volumes.net = drives)

	return volumes
}

const storeFiles = (incoming) => {
	console.log(`conlog: incoming`, incoming)
	let strung = JSON.stringify(incoming).replaceAll('\\\\', '/').split('{')

	// let unstrung = strung.map(f => {

	// })

	let tack = '{' + strung[17]

	console.log(`conlog: strung`, tack)
}

contextBridge.exposeInMainWorld('api', {
	directoryContents,
	currentDirectory,
	getTree,
	getVolumes,
	storeFiles,
})
