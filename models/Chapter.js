const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/dbConnect");
const syncDb = require("../database/syncDb");

class Chapter extends Model { };
Chapter.init({
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
    order: {
        type: DataTypes.INTEGER
    },
    novelId: {
        type: DataTypes.INTEGER
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "chapter"
});

syncDb(Chapter);

module.exports = Chapter;