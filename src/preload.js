let { readdir } = require('fs/promises')
let { contextBridge } = require('electron')
const dirTree = require("directory-tree");

const currentDirectory = () => {
	return process.cwd()
}

const directoryContents = async (path) => {
	let results = await readdir(path, { withFileTypes: true })
	console.log("results", results)
	return results.map((entry) => ({
		name: entry.name,
		type: entry.isDirectory() ? 'directory' : 'file',
	}))
}

const getTree = async (path) => {
	return dirTree(path)
}

contextBridge.exposeInMainWorld('api', { directoryContents, currentDirectory, getTree })
