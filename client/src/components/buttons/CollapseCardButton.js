import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from "@material-ui/core/styles";
import { IconButton, Tooltip } from '@material-ui/core';

const CollapseCardButton = ({handleCollapse, collapsed, tooltip, style}) => {
    const theme = useTheme();
    return (
        <Tooltip
            title={tooltip && tooltip.text ? tooltip.text : "Collapse"}
            placement={tooltip && tooltip.placement ? tooltip.placement : "top"}
        >
            <IconButton 
            onClick={() => handleCollapse(!collapsed)} 
            style={{ 
                ...style,
                color: theme.palette.secondary.main, 
                backgroundColor: theme.palette.secondary.normal 
                }}
            >
                {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
        </Tooltip>
    )
}

export default CollapseCardButton
