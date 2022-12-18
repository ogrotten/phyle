const { readdir } = require('fs/promises')
const path = require('path')
const { contextBridge } = require('electron')
const dirTree = require('directory-tree')
const nodeDiskInfo = require('node-disk-info')
const { walkObject } = require('walk-object')
const example = require('./sqlite/example.json')

const dbFiles = require('./sqlite/dbFiles')
const dbTags = require('./sqlite/dbTags')

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
	const tree = dirTree(absolutePath, { normalizePath: true })

	let filesOnly = []
	walkObject(tree, ({ value, location, isLeaf }) => {
		if (Object.entries(value).length === 2) {
			filesOnly.push(value)
		}
	})
	dbFiles.storeFiles(filesOnly)
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
}

contextBridge.exposeInMainWorld('api', {
	directoryContents,
	currentDirectory,
	getTree,
	getVolumes,
	storeFiles,
	getFiles: dbFiles.getFiles,
	getTags: dbTags.getTags,
})
