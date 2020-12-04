import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import updateItem from '../../store/actions/updateItem'

import { IconButton, Tooltip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


const CompletedButton = ({ item, tooltip, updateItem, style, type }) => {
    const [icon, setIcon] = useState();

    useEffect(() => setIcon(item.completed ? <DoneIcon /> : <CloseIcon />), [item])

    const getType = (typ, plural) => {
        switch(typ) {
            case 'novels':
                if (plural) return 'novels'
                else return 'novel'
            case 'short-story': 
                if (plural) return 'shortStories'
                else return 'shortStory'
            case 'chapters': 
                if (plural) return 'chapters'
                else return 'chapter'
        }
    } 

    const onClick = () => {
        updateItem(
            getType(type),
            getType(type, true),
            { id: item.id, completed: !item.completed }
        )
    }

    const handleMouseEnter = () => setIcon(item.completed ? <CloseIcon /> : <DoneIcon />)
    const handleMouseLeave = () => setIcon(item.completed ? <DoneIcon /> : <CloseIcon />)

    return (
        <Tooltip
            title={tooltip && tooltip.text ? tooltip.text : item.completed ? "Set not completed" : "Set completed"}
            placement={tooltip && tooltip.placement ? tooltip.placement : "right"}
        >
            <IconButton
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                color="secondary"
                style={style ? style : {}}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItem: (modelName, object, data) => dispatch(updateItem(modelName, object, data))
    }
}

export default connect(null, mapDispatchToProps)(CompletedButton)
