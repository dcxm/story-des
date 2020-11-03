import React from 'react'
import {
    Tooltip,
    IconButton
} from '@material-ui/core'
import {useTheme} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';

const DownloadButton = ({onClick, tooltip, style}) => {
    const theme = useTheme();
    return (
        <Tooltip
            title={tooltip && tooltip.text ? tooltip.text : "Download"}
            placement={tooltip && tooltip.placement ? tooltip.placement : "right"}
        >
            <IconButton
                onClick={onClick}
                color="secondary"
                style={style && style}>
                    <GetAppIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DownloadButton
