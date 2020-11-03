import React from 'react'

import { IconButton, Tooltip } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { useTheme } from "@material-ui/core/styles";

const EditButton = ({ onClick, tooltip, children, style }) => {
    const theme = useTheme();
    return (
        <Tooltip
            title={tooltip && tooltip.text ? tooltip.text : "Edit details"}
            placement={tooltip && tooltip.placement ? tooltip.placement : "top"}
        >
            <IconButton
                onClick={onClick}
                color="secondary"
                style={style ? style : {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.secondary.normal
                }}>
                {children ? children : <SettingsIcon />}
            </IconButton>
        </Tooltip>
    )
}

export default EditButton
