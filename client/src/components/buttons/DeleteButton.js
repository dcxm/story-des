import React, { useState } from 'react'
//  redux
import { connect } from "react-redux";
import deleteItemsAction from "../../store/actions/deleteItemsAction";
import { setSnackbarMessage, setSnackbarOpen } from "../../store/actions/snackbarActions";
import loadingAction from "../../store/actions/loadingAction";
//  material ui 
import { useTheme } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DeletePrompt from '../dialogs/DeletePrompt'

const DeleteButton = ({
    modelName,
    tooltip,
    objectName,
    itemId,
    handleDelete,
    snackbarMessage,
    setSnackbarMessage,
    setSnackbarOpen,
    loading,
    setLoading,
    deleteItem }) => {
    
    const [isPromptOpen, setIsPromptOpen] = useState(false)

    const theme = useTheme()

    const deleteAction = () => {
        if (!handleDelete) {
            deleteItem(modelName, objectName, itemId);
            setIsPromptOpen(!isPromptOpen)
            setSnackbarMessage(snackbarMessage);
            setSnackbarOpen();
        } else {
            handleDelete(setSnackbarMessage, setSnackbarOpen, loading, setLoading);
        }
    }

    return (
        <>
        <Tooltip title="Delete" placement={tooltip ? tooltip.placement ? tooltip.placement : "right" : "right"}>
            <IconButton color="primary" onClick={() => setIsPromptOpen(!isPromptOpen)}>
                <DeleteIcon style={{ color: theme.palette.secondary.dark }} />
            </IconButton>
        </Tooltip>
        <DeletePrompt 
            open={isPromptOpen} 
            setOpen={() => setIsPromptOpen(!isPromptOpen)} 
            deleteAction={deleteAction} 
            loading={loading} 
            itemId={itemId} 
        />
        </>
    )
}

const mapStateToProps = state => {
    const { loading } = state;
    return {
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (payload) => dispatch(loadingAction(payload)),
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setSnackbarOpen: () => dispatch(setSnackbarOpen()),
        deleteItem: (modelName, obj, id) => dispatch(deleteItemsAction(modelName, obj, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
