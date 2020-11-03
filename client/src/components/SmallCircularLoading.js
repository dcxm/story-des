import React from 'react'
import { CircularProgress } from "@material-ui/core"

const SmallCircularLoading = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <CircularProgress color="primary" disableShrink style={{ margin: "2em" }} />
        </div>
    )
}

export default SmallCircularLoading
