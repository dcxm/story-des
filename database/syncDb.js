const syncDb = async (model, force) => {
    try {
      await model.sync({force: force === true ? true : false})
      console.log(`${model} synced`);
    } catch (error) {
      console.log(error);
    }
}

module.exports = syncDb;