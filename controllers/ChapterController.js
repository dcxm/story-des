const Controller = require("./Controller");

class Chapter extends Controller {
    constructor(model) {
        super(model)
    }
    async getNewChaptersOrder(novelId, callback) {
        try {
            const foundRow = await this.model.findAll({
                where: {
                    novelId: novelId
                },
                order: [["order", "ASC"]]
            })
            if (foundRow.length > 0) {
                const num = foundRow[foundRow.length -1].order + 1;
                callback(num);
                return;
            } else {
                const num = 1;
                callback(num);
                return;
            }
        } catch (error) {
            if (error) console.log(error);
            return;
        }
    }
}

const chapterControllerInstance = new Chapter(require("../models/Chapter"));

module.exports = { Chapter, chapterControllerInstance };