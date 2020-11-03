import React, { Fragment, useState } from 'react'
import { Fab as MUIFab } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddItemsDialog from "./dialogs/AddItemsDialog";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const Fab = () => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const fab = {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
        label: 'Add',
    }

    const handleFabClick = (e) => setOpen(!open);

    return (
        <Fragment>
            <MUIFab style={{position: "fixed"}} className={fab.className} color={fab.color} onClick={handleFabClick}>
                {fab.icon}
            </MUIFab>
            <AddItemsDialog open={open} setOpen={setOpen}/>
        </Fragment>
    )
}

export default Fab
