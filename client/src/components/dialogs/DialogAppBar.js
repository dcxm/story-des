import React from 'react'

import {
    Toolbar,
    Typography,
    AppBar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        padding: ".5em"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const DialogAppBar = ({ title, handleClose, titleVariant, titleSpacing }) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant={titleVariant ? titleVariant : "h5"} className={classes.title}>{title}</Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default DialogAppBar
