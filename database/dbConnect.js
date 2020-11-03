require('dotenv').config();
const {app} = require('electron');
const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require('fs');

function createDbDir() {
    if (process.env.NODE_ENV !== 'development') {
        fs.mkdir(path.join(app.getPath('userData'), 'db'), error => {if (error) return})
    }
}
createDbDir();

const storagePath = process.env.NODE_ENV !== 'development' ? 
    path.join(app.getPath('userData'), 'db', 'story-db.sqlite') 
    : path.join(__dirname, 'database.sqlite');
console.log(storagePath, process.env.NODE_ENV)
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storagePath
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error("Unable to connect to database", error)
    }
}


module.exports = { sequelize, testConnection };