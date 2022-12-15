let { readdir } = require('fs/promises')
const path = require("path");
let { contextBridge } = require('electron')
const dirTree = require("directory-tree");

const currentDirectory = () => {
	return process.cwd()
}

const directoryContents = async (incoming) => {
	let results = await readdir(incoming, { withFileTypes: true })

	const absolutePath = path.resolve(incoming);
	console.log("incoming", incoming, absolutePath)
	dirTree(absolutePath)

	return results.map((entry) => ({
		name: entry.name,
		type: entry.isDirectory() ? 'directory' : 'file',
	}))
}

const getTree = async (incoming) => {
	console.log("incoming", incoming)
	const absolutePath = path.resolve(incoming);
	console.log("incoming", absolutePath)
	return dirTree(absolutePath)
}




contextBridge.exposeInMainWorld('api', { directoryContents, currentDirectory, getTree })
