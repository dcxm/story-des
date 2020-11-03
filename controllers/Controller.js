const { Op } = require("sequelize");

const whereConditionsCheck = (conditions) => {
    if (conditions) {
        if (typeof conditions === "function") return conditions(Op)
        if (typeof conditions === "object") return conditions
    } else return null
}

class Controller {
    constructor(model) {
        this.model = model;
        this.error = null;
    }

    async create(data) {
        try {
            const newRow = await this.model.create(data);
            return newRow;
        } catch (error) {
            if (error) this.error = error;
            return null;
        }
    }

    async get(conditions, attributes, order, include) {
        try {
            const foundRows = await this.model.findAll({
                attributes: attributes ? attributes : null,
                where: whereConditionsCheck(conditions),
                include: include ? include : null,
                order: order && [order]
            })
            if (foundRows.length === 0) {
                this.error = {errorType: "Not found"}
                return;
            }
            return foundRows;
        } catch (error) {
            if (error) this.error = error;
            return;
        }
    }

    async update(conditions, updateData) { 
        try {
            const updatedRows = await this.model.update(updateData, {
                where: whereConditionsCheck(conditions)
            })
            if (updatedRows === null) {
                this.error = {errorType: "Not found"}
                return;
            }
            return updatedRows;
        } catch (error) {
            if (error) this.error = error;
            return;
        }
    }

    async delete(conditions, truncanate) {
        try {
            const deletedRows = await this.model.destroy({
                where: whereConditionsCheck(conditions),
                truncanate: truncanate ? truncanate : null
            });
            return deletedRows;
        } catch (error) {
            if (error) this.error = error;
            return;
        }
    }

    handleError(callback) {
        if (this.error) callback(this.error);
        else return;
    }
}

module.exports = Controller;