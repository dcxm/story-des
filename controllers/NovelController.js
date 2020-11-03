const Controller = require("./Controller");

class NovelController extends Controller {
    constructor(model) {
        super(model);
    }
}

const novelControllerInstance = new NovelController(require("../models/Novel"));

module.exports = {NovelController, novelControllerInstance}