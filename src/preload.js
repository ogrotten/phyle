const { readdir } = require('node:fs/promises')
const path = require('path')
const { contextBridge } = require('electron')
const dirTree = require('directory-tree')
const nodeDiskInfo = require('node-disk-info')
const { walkObject } = require('walk-object')
const example = require('./db/example.json')

const dbFiles = require('./db/dbFiles')
const dbTags = require('./db/dbTags')

// windows network drives
let networkDrive = require('windows-network-drive')

const currentDirectory = () => {
	return process.cwd()
}

const directoryContents = async (incoming) => {
	let results = await readdir(incoming, { withFileTypes: true }).catch(
		(err) => {
			const toMatch = new RegExp(`(no such file or directory)`, 'ig')
			const check = err.message.match(toMatch)

			check
				? console.error(`ERROR: Bad directory. `, err)
				: console.error(`ERROR: `, err)
		}
	)
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
	return filesOnly
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

	return volumes
}

contextBridge.exposeInMainWorld('api', {
	directoryContents,
	currentDirectory,
	getTree,
	getVolumes,
	storeFiles: dbFiles.storeFiles,
	getFiles: dbFiles.getFiles,
	dbFiles,
	dbTags,
})
