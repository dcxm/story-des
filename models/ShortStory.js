const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/dbConnect");
const syncDb = require("../database/syncDb");

class ShortStory extends Model { };
ShortStory.init({
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
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "short_story"
});

syncDb(ShortStory);

module.exports = ShortStory;