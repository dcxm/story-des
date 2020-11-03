require("dotenv").config()
const { app, BrowserWindow, session, Menu } = require("electron")
const path = require("path")
const url = require("url")
const { testConnection } = require("./database/dbConnect")

const { callShortStoryEvents } = require("./databaseEvents/ShortStoryEvents")
const { callNovelEvents } = require("./databaseEvents/NovelEvents")
const { callChapterEvents } = require("./databaseEvents/ChapterEvents")

testConnection()

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 800,
        height: 800,
        minHeight: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    const URL = url.format({
        pathname: path.join(__dirname, 'client', 'build', 'index.html'),
        protocol: 'file:'
    })
    console.log('PATH', URL)
    mainWindow.maximize()
    mainWindow.loadURL(process.env.NODE_ENV === 'development' ?
        "http://localhost:3000"
        :
        URL)
}

const loadExtensions = () => {
    if (process.env.NODE_ENV === 'development') {
        session.defaultSession.loadExtension(path.join(__dirname, "dev-extensions/react-devtool"))
            .then(({ id }) => console.log(`${id} is loaded`))
            .catch(error => console.log(error))
        session.defaultSession.loadExtension(path.join(__dirname, "dev-extensions/redux-devtool"))
            .then(({ id }) => console.log(`${id} is loaded`))
            .catch(error => console.log(error))
    }
}

app.whenReady().then(() => {
    createWindow()
    loadExtensions()
    if (process.env.NODE_ENV !== 'development') Menu.setApplicationMenu(null)
})

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit())

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

//  events
callShortStoryEvents
callNovelEvents
callChapterEvents