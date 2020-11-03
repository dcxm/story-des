const DatabaseEvents = require("./DatabaseEvents");
const { novelControllerInstance } = require("../controllers/NovelController");

class NovelEvents extends DatabaseEvents {
    constructor(modelName, controllerInstance) {
        super(modelName, controllerInstance);
    }
}

const novelEventsInstance = new NovelEvents("novel", novelControllerInstance);

const callNovelEvents = novelEventsInstance.call();

module.exports = { NovelEvents, novelEventsInstance, callNovelEvents }
