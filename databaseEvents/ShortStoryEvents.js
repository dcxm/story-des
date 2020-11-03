const DatabaseEvents = require("./DatabaseEvents");
const { shortStoryControllerInstance } = require("../controllers/ShortStoryController");

class ShortStoryEvents extends DatabaseEvents {
    constructor(modelName, controllerInstance) {
        super(modelName, controllerInstance);
    }
}

const shortStoryEventsInstance = new ShortStoryEvents("shortStory", shortStoryControllerInstance);

const callShortStoryEvents = shortStoryEventsInstance.call();

module.exports = { ShortStoryEvents, shortStoryEventsInstance, callShortStoryEvents };