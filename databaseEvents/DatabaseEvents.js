const { ipcMain } = require("electron");

class DatabaseEvents {
    constructor(modelName, controllerInstance) {
        this.modelName = modelName;
        this.controllerInstance = controllerInstance;
    }

    create() {
        ipcMain.on(`database:create-${this.modelName}`, (event, args) => {
            this.controllerInstance.create(args)
                .then(response => {
                    this.controllerInstance.handleError(error => {
                        if (error) return error
                    })
                    event.sender.send(`database:create-${this.modelName}`, response.dataValues);
                }).catch(err => console.log(err))
        })
    }

    get() {
        ipcMain.on(`database:get-${this.modelName}`, (event, args) => {
            const argsCondition = () => {
                if (args) {
                    return args
                } else {
                    return;
                }
            }
            this.controllerInstance.get(argsCondition(), null, ["createdAt", "DESC"])
                .then(response => {
                    event.sender.send(`database:get-${this.modelName}`, response);
                })
        })
    }

    update() {
        ipcMain.on(`database:update-${this.modelName}`, (event, args) => {
            if (args.id) {
                this.controllerInstance.update({ id: args.id }, { ...args, id: args.id })
                    .then(response => {
                        this.controllerInstance.get({id: args.id}).then(response => {
                            event.sender.send(`database:update-${this.modelName}`, response);
                        })
                    })
            } else event.sender.send(`database:update-${this.modelName}`, { errorType: "missing:id" })
        })
    }

    delete() {
        ipcMain.on(`database:delete-${this.modelName}`, (event, args) => {
            if (args) {
                this.controllerInstance.get(args)
                    .then(getResult => {
                        this.controllerInstance.delete({ id: args.id }, false)
                            .then(response => {
                                event.sender.send(`database:delete-${this.modelName}`, getResult);
                            })
                    })

            }

        })
    }

    call() {
        this.create();
        this.get();
        this.update();
        this.delete();
    }
}

module.exports = DatabaseEvents;