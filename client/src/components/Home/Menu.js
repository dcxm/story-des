import React, { Fragment, useState } from 'react'
import { Menu as MUImenu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import {connect} from "react-redux";

import {setSnackbarMessage, setSnackbarOpen} from "../../store/actions/snackbarActions";
const Menu = ({ items, handleClose, anchorEl, id, type, setSnackbarOpen, setSnackbarMessage, itemName}) => {
    return (
        <Fragment>
            <MUImenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.length > 0 ? items.map(item => (
                    item === false ? "" : <MenuItem key={item.name} onClick={() => {
                        item.action(type, type, id)
                        if (item.name === "Delete") {
                            setSnackbarMessage(`${itemName} was deleted!`)
                            setSnackbarOpen()
                        }
                    }}>{item.name}</MenuItem>
                )) : <MenuItem onClick={handleClose}>{items[0].name}</MenuItem>}
            </MUImenu>

        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setSnackbarOpen: () => dispatch(setSnackbarOpen())
    }
}

export default connect(null, mapDispatchToProps)(Menu);
