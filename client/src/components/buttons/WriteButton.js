import React from 'react'
import {
    Tooltip,
    IconButton
} from "@material-ui/core";
import {useTheme} from "@material-ui/styles"
import CreateIcon from "@material-ui/icons/Create";

const WriteButton = ({onClick, tooltip}) => {
    const theme = useTheme();
    return (
        <Tooltip 
            title={tooltip && tooltip.text ? tooltip.text : "Write"} 
            placement={tooltip && tooltip.placement ? tooltip.placement : "right"}
        >
            <IconButton 
                color="primary" 
                onClick={onClick}
            >
                <CreateIcon style={{ color: theme.palette.secondary.dark }} />
            </IconButton>
        </Tooltip>
    )
}

export default WriteButton
