import React from 'react'
import { connect } from "react-redux"
import setAddChapterOpen from "../../store/actions/setAddChapterOpen"
import { useTheme } from "@material-ui/core/styles";
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddChapterButton = ({ setOpen, tooltip }) => {
    const theme = useTheme();
    const handleAddChapterOpen = e => {
        setOpen();
    }
    return (
        <Tooltip
            title={tooltip && tooltip.text ? tooltip.text : "Add"}
            placement={tooltip && tooltip.placement ? tooltip.placement : "top"}
        >
            <IconButton onClick={handleAddChapterOpen} style={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.secondary.normal }}>
                <AddIcon />
            </IconButton>
        </Tooltip>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setOpen: () => dispatch(setAddChapterOpen())
    }
}

export default connect(null, mapDispatchToProps)(AddChapterButton);
