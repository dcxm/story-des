import React from 'react'
import { Fab } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const EditorFocusFab = ({style, onClick, display}) => {
    const classes = useStyles();
    const theme = useTheme();
    const fab = {
        color: 'primary',
        className: classes.fab,
        label: 'Add',
    }
    return (
        <Fab style={{...style }} className={fab.className} color={fab.color} onClick={onClick} size="small">
            {display ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Fab>
    )
}

export default EditorFocusFab
