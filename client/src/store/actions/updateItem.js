import { UPDATE_ITEM } from "./types";
import loadingAction from "./loadingAction";

const updateItem = (modelName, object, data) => {
    console.log(data)
    return (dispatch) => {
        dispatch(loadingAction({ component: "button:save", loading: true }))
        window.ipcRenderer.send(`database:update-${modelName}`, data);
        window.ipcRenderer.once(`database:update-${modelName}`, (event, args) => {
            console.log(args)
            dispatch(
                {
                    type: UPDATE_ITEM,
                    payload: { [object]: args[0] }
                }
            );
            dispatch(loadingAction({ component: "", loading: false }));
            return;
        })
    }
}



export default updateItem;