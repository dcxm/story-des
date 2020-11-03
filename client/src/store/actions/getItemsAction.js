import setItems from "./setItems";
import loadingAction from "./loadingAction";


const getItemsAction = (modelName, object, loadingComponent, args) => {
    return (dispatch) => {
        dispatch(loadingAction({ component: loadingComponent ? loadingComponent : "", loading: true }))
        window.ipcRenderer.send(`database:get-${modelName}`, args ? args  : "");
        window.ipcRenderer.once(`database:get-${modelName}`, (event, args) => {
            if (!args) {
                dispatch(setItems({ [object]: [] }));
                dispatch(loadingAction({ component: "", loading: false }))
                return null
            };
            dispatch(loadingAction({ component: "", loading: false }))
            dispatch(setItems({ [object]: args }));
            return null
        })
        dispatch(loadingAction({ component: "", loading: false }))
    }
}

export default getItemsAction