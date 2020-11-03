const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/dbConnect");
const syncDb = require("../database/syncDb");

const Chapter = require("./Chapter");

class Novel extends Model { };
Novel.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plot: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isChapters: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "novel"
});

Novel.hasMany(Chapter, {
    foreignKey: "novelId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
Chapter.belongsTo(Novel);

syncDb(Novel);

module.exports = Novel;