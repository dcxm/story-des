import deleteItems from "./deleteItems";
import loadingAction from "./loadingAction";

const deleteItemsAction = (modelName, object, id) => {
    return (dispatch) => {
        dispatch(loadingAction({ component: `item-${id}`, loading: true }))
        window.ipcRenderer.send(`database:delete-${modelName}`, {id});
        window.ipcRenderer.once(`database:delete-${modelName}`, (event, args) => {
            dispatch(loadingAction({ component: "", loading: false }))
            dispatch(deleteItems({ [object]: args[0].dataValues }));
        })
    }
}
export default deleteItemsAction