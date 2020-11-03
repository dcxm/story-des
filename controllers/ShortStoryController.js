const Controller = require("./Controller");

class ShortStoryController extends Controller {
    constructor(model) {
        super(model);
    }
}

const shortStoryControllerInstance = new ShortStoryController(require("../models/ShortStory"));

module.exports = {ShortStoryController, shortStoryControllerInstance}