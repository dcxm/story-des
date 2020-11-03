import React, { Fragment } from 'react'
import { TextField } from '@material-ui/core';

const ItemEdit = ({ formState, setFormState, itemType }) => {
    return (
        <Fragment>
            <TextField
                label={`${itemType[0].toUpperCase() + itemType.slice(1)} title`}
                variant="outlined"
                size="medium"
                fullWidth
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                value={formState.title}
            />
            <TextField
                label={`${itemType[0].toUpperCase() + itemType.slice(1)} plot`}
                variant="outlined"
                size="medium"
                multiline
                style={{ whiteSpace: "pre-line", marginTop: "2em" }}
                fullWidth
                spellCheck={false}
                onChange={(e) => setFormState({ ...formState, plot: e.target.value })}
                value={formState.plot}
            />
        </Fragment>
    )
}

export default ItemEdit
