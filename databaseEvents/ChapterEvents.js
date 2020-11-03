const { ipcMain } = require("electron");
const DatabaseEvents = require("./DatabaseEvents");
const { chapterControllerInstance } = require("../controllers/ChapterController");

class ChapterEvents extends DatabaseEvents {
    constructor(modelName, controllerInstance) {
        super(modelName, controllerInstance);
    }
    get() {
        ipcMain.on(`database:get-${this.modelName}`, (event, args) => {
            const argsCondition = () => args ? args : ''
            this.controllerInstance.get(argsCondition(), null, ["order", "ASC"])
                .then(response => {
                    console.log(response)
                    event.sender.send(`database:get-${this.modelName}`, response);
                })
        })
    }
    create() {
        ipcMain.on(`database:create-${this.modelName}`, (event, args) => {
            this.controllerInstance.getNewChaptersOrder(args.novelId, (orderNumber) => {
                console.log(orderNumber)
                this.controllerInstance.create({ ...args, order: orderNumber })
                    .then(response => {
                        this.controllerInstance.handleError(error => console.log(error))
                        console.log(response)
                        event.sender.send(`database:create-${this.modelName}`, response);
                    })
            })
        });
    }
    update() {
        ipcMain.on(`database:update-${this.modelName}`, (event, args) => {
            if (Array.isArray(args)) {
                args.map(async ({ dataValues }) => {
                    console.log(dataValues)
                    try {
                        await this.controllerInstance.update(
                            { novelId: dataValues.novelId, id: dataValues.id },
                            { order: dataValues.order }
                        );
                    } catch (error) {
                        event.sender.send(`database:update-${this.modelName}`, error);
                        return;
                    }
                })
            } else {
                if (args) {
                    this.controllerInstance.update({ id: args.id }, { ...args, id: args.id })
                        .then(response => {
                            this.controllerInstance.get({id: args.id}).then(chapterResponse => {
                                event.sender.send(`database:update-${this.modelName}`, chapterResponse);
                            })
                        })
                }
            }
        });
    }
    updateOrder() {
        ipcMain.on(`database:update-${this.modelName}Order`, (event, args) => {
            args.map(async ({ dataValues }) => {
                console.log(dataValues)
                try {
                    await this.controllerInstance.update(
                        { novelId: dataValues.novelId, id: dataValues.id },
                        { order: dataValues.order }
                    );
                } catch (error) {
                    event.sender.send(`database:update-${this.modelName}`, error);
                    return;
                }
            })
        })
    }
    delete() {
        ipcMain.on(`database:delete-${this.modelName}`, (event, args) => {
            this.controllerInstance.delete({ id: args.id, novelId: args.novelId });
            this.controllerInstance.get({ novelId: args.novelId }, null, ["order", "ASC"])
                .then(response => {
                    if (response) {
                        let resArr = [];
                        response.map((item, index) => {
                            this.controllerInstance.update(
                                {
                                    id: item.dataValues.id,
                                    novelId: args.novelId
                                },
                                {
                                    order: index + 1
                                }
                            ).then(() => {
                                this.controllerInstance.get({ id: item.id, novelId: item.novelId }, null, ["order", "ASC"])
                                    .then(item => resArr.push(...item))
                                event.sender.send(`database:delete-${this.modelName}`, resArr)
                            })
                        })
                    } else {
                        event.sender.send(`database:delete-${this.modelName}`);
                    }
                }).catch(err => console.log(err))

        })
    }
}

const chapterEventsInstance = new ChapterEvents("chapter", chapterControllerInstance);

const callChapterEvents = chapterEventsInstance.call();

module.exports = { ChapterEvents, chapterEventsInstance, callChapterEvents }
