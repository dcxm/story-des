import React from 'react'
import { Button, Box, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {connect} from "react-redux";
import loadingAction from "../../store/actions/loadingAction";

const useStyle = makeStyles({
    circle: {
        color: "white"
    }
});

const SaveButton = ({ saveAction, loading, setLoading }) => {
    const theme = useTheme();
    const classes = useStyle();

    const handleSave = () => {
        const setLoadOn = () => setLoading({ component: "button:save", loading: true });
        const setLoadOff = () => setLoading({ component: "", loading: false });;
        saveAction(setLoadOn, setLoadOff);
    }
    
    return (
        <Box>
            {loading.loading && loading.component === "button:save" ?
                <Button variant="contained" color="primary">
                    <CircularProgress
                        color="secondary"
                        disableShrink
                        classes={{ circle: classes.circle }}
                        size={20}
                        style={{ marginRight: "1em" }}
                    />
                                Saving...
                            </Button>
                :
                <Button variant="contained" color="primary" onClick={!loading.loading && loading.component !== "button:save" && handleSave}>Save</Button>
            }
        </Box>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLoading: (payload) => dispatch(loadingAction(payload))
    }
}

const mapStateToProps = state => {
    const {loading} = state;
    return {
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
