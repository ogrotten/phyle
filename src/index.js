// TODO
// COMPLETELY REBUILD THE ARCHITECTURE FOR
// TAG STORAGE AND FILTERING.

// This file is the entry point for the Electron application.
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const debug = require('electron-debug')

console.log(`conlog: __dirname`, path.join(__dirname, 'preload.js'))

function createWindow() {
	debug()
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	if (process.env.NODE_ENV !== 'development') {
		console.log('\n\nNOT Development mode\n\n')
		// Load production build
		win.loadFile(`${__dirname}/renderer/dist/index.html`)
	} else {
		// Load vite dev server page
		console.log('\n\nDevelopment mode\n\n')
		win.loadURL('http://localhost:3000/')
	}
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('databasePath', async (event, dbPath) => {
	// './sqlite/phyle.db'
	return await sqlite.setdbPath(dbPath)
})

ipcMain.handle('executeQuery', async (event, query, fetch, value) => {
	return await sqlite.executeQuery(query, fetch, value)
})

ipcMain.handle('executeMany', async (event, query, values) => {
	return await sqlite.executeMany(query, values)
})
