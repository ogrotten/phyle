let { readdir } = require('fs/promises')
let { contextBridge } = require('electron')

let currentDirectory = () => {
	return process.cwd()
}

let directoryContents = async (path) => {
	let results = await readdir(path, { withFileTypes: true })
	return results.map((entry) => ({
		name: entry.name,
		type: entry.isDirectory() ? 'directory' : 'file',
	}))
}

contextBridge.exposeInMainWorld('api', { directoryContents, currentDirectory })
