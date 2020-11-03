import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    Divider,
    DialogActions,
    Box
} from '@material-ui/core';

import ItemEdit from "../ItemEdit";
import SaveButton from "../buttons/SaveButton";

import DialogAppBar from "./DialogAppBar";

import { connect } from "react-redux";
import updateItem from "../../store/actions/updateItem";
import { setSnackbarMessage, setSnackbarOpen } from "../../store/actions/snackbarActions";

const EditDetailsDialog = ({ item, setItem, action, type, open, setOpen, updateItem, setSnackbarOpen, setSnackbarMessage }) => {
    const [clearedType, setClearedType] = useState("");
    const [formState, setFormState] = useState({});
    useEffect(() => {
        const determineType = () => {
            switch (type) {
                case "novels":
                    return "novel";
                case "shorts":
                    return "short story";
                case "chapters":
                    return "chapter";
                default:
                    break;
            }
        }
        setClearedType(determineType())
        setFormState({
            id: item.id,
            title: item.title && item.title,
            plot: item.plot && item.plot
        })
    }, [item])

    const saveAction = (setLoadOn, setLoadOff) => {
        if (!action) {
            switch (type) {
                case 'novels':
                    updateItem("novel", 'novels', formState);
                    break;
                case 'shorts':
                    updateItem("shortStory", 'shortStories', formState);
                    break;
            }
            setItem({ ...item, title: formState.title, plot: formState.plot });
            setOpen();
            setSnackbarMessage(`${clearedType[0].toUpperCase() + clearedType.slice(1)} were updated`);
            setSnackbarOpen();
        } else {
            action(formState, setSnackbarOpen, setSnackbarMessage, setLoadOn, setLoadOff)
        }
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body" onClose={setOpen}>
            <DialogAppBar title={`Edit ${clearedType} "${item.title}"`} handleClose={setOpen} />
            <DialogContent>
                <Box mt={4} p={1} style={{ overflow: "hidden" }}>
                    <ItemEdit item={item} formState={formState} setFormState={setFormState} itemType={clearedType} />
                </Box>
            </DialogContent>
            <Divider style={{ marginTop: "2em" }} />
            <DialogActions>
                <SaveButton saveAction={saveAction}>Save</SaveButton>
            </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateItem: (url, obj, data) => dispatch(updateItem(url, obj, data)),
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setSnackbarOpen: () => dispatch(setSnackbarOpen())
    }
}

export default connect(null, mapDispatchToProps)(EditDetailsDialog)
