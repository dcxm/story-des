import React from 'react';

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import { useTheme } from "@material-ui/core";

const DetailsButton = ({ onClick, color, tooltip }) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={tooltip && tooltip.text ?
                tooltip.placement : "Details"}
            placement={tooltip && tooltip.placement ?
                tooltip.placement : "right"}
        >
            <IconButton color="primary" onClick={onClick}>
                <PlayCircleFilledIcon
                    style={{ color: color ? color : theme.palette.secondary.dark }}
                />
            </IconButton>
        </Tooltip>
    )
}

export default DetailsButton
