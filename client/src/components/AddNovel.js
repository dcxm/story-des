import React, { useState } from "react";
import {
    Typography,
    Divider,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Box,
    Card,
    CardHeader,
    Switch,
    Container,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import addItem from "../store/actions/addItem";
import loadingAction from "../store/actions/loadingAction";
import { setSnackbarMessage, setSnackbarOpen } from "../store/actions/snackbarActions";

const useStyle = makeStyles({
    circle: {
        color: "white"
    }
});

const AddNovel = ({ setNovels, setOpen, setLoading, loading, setSnackbarOpen, setSnackbarMessage }) => {
    const classes = useStyle();
    const [novelData, setNovelData] = useState({
        title: "",
        plot: "",
        isChapters: true,
        completed: false
    });
    const [error, setError] = useState({error: false, msg: null});

    const saveNovel = () => {
        if (loading.loading !== true && loading.component !== "button:save") {
            if (novelData.title.length > 0) {
                setLoading({ component: "button:save", loading: true })
                window.ipcRenderer.send("database:create-novel", novelData);
                window.ipcRenderer.once("database:create-novel", (event, args) => {
                    setNovels({ novels: [{ dataValues: args }] });
                    setOpen();
                    setLoading({ component: "", loading: false });
                    setSnackbarMessage(`${novelData.title} were created!`)
                    setSnackbarOpen();
                })
            } else {
                setError({ error: true, msg: "Title is required to save this" })
            }
        } else {
            return;
        }
    }
    
    const handleTitleChange = (e) => {
        setError({error: false, msg: null});
        setNovelData({ ...novelData, title: e.target.value })
    };
    
    const handlePlotChange = (e) => setNovelData({ ...novelData, plot: e.target.value });
    const handleCompletedSwitchChange = (e) => setNovelData({ ...novelData, completed: !novelData.completed });

    return (
        <Box mt={4}>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h4">Add a novel</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
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
                            <Button variant="contained" color="primary" onClick={!loading.loading && loading.component !== "button:save" ? saveNovel : undefined}>Save</Button>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "1em" }}>
                    <Grid item xs={12} md={7}>
                        <TextField
                            margin="normal"
                            style={{ marginTop: "0" }}
                            label="Novel title"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            required
                            helperText="This field is required"
                            onChange={handleTitleChange}
                        />
                        <TextField
                            style={{ marginTop: ".5em" }}
                            margin="normal"
                            multiline
                            label="Novel plot"
                            variant="outlined"
                            size="medium"
                            onChange={handlePlotChange}
                            fullWidth
                        />
                        {error.error && <Typography style={{ color: "red", marginBottom: "1em" }} variant="body1">{error.msg}</Typography>}
                    </Grid>
                    <Grid item xs={12} md={5}>
                            <Card variant="outlined">
                                <CardHeader title="Completed?" subheader="Set if novel are already completed" />
                                <Divider />
                                <Box p={1}>
                                    <Switch
                                        checked={novelData.completed}
                                        onChange={handleCompletedSwitchChange}
                                        name="isCompleted"
                                        color="primary"
                                    />
                                </Box>
                            </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { loading } = state;
    return {
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNovels: (payload) => dispatch(addItem(payload)),
        setLoading: (payload) => dispatch(loadingAction(payload)),
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setSnackbarOpen: () => dispatch(setSnackbarOpen())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNovel);