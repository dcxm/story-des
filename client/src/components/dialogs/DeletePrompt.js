import React, { useState } from 'react'
import {
    Dialog,
    Toolbar,
    Typography,
    DialogContent,
    Divider,
    CircularProgress,
    Button,
    AppBar,
    Slide,
    IconButton,
    DialogActions,
    Box
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

import DialogAppBar from "./DialogAppBar";

const useStyle = makeStyles({
    circle: {
        color: "white"
    }
});

const DeletePrompt = ({ open, setOpen, deleteAction, itemId, loading }) => {

    const handleClose = () => setOpen();
    const classes = useStyle();

    return (
        <Dialog maxWidth="lg" open={open} onClose={handleClose} >
            <DialogAppBar title="Delete" handleClose={handleClose} />
            <DialogContent>
                <Box my={4} mx={3} style={{ overflow: "hidden" }}>
                    <Typography variant="h6" style={{ textAlign: 'center' }}>
                        Are you sure you want to delete this item?
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={deleteAction}>Yes</Button>
                <Button color="primary" variant="contained" onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeletePrompt
