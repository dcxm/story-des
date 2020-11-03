import React, { useState } from "react";
import {
    Dialog,
    Slide,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    AppBar,
    IconButton,
    TextField,
    Button,
    CircularProgress,
    Switch,
    Grid,
    Box,
    Card,
    CardHeader,
    CardContent,
    Container,
    Tabs,
    Tab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { connect } from "react-redux";
import setItems from "../store/actions/setItems";
import addItem from "../store/actions/addItem";
import loadingAction from "../store/actions/loadingAction";
import { setSnackbarMessage, setSnackbarOpen } from "../store/actions/snackbarActions";

const useStyle = makeStyles({
    circle: {
        color: "white"
    }
});

const AddShort = ({ setShorts, setOpen, loading, setLoading, setSnackbarOpen, setSnackbarMessage }) => {
    const theme = useTheme();
    const classes = useStyle();
    const [shortStoryData, setShortStoryData] = useState({
        title: "",
        plot: "",
        completed: false
    });
    const [error, setError] = useState({ error: false, msg: null });
    const saveShort = () => {
        if (loading.loading !== true && loading.component !== "button:save") {
            if (shortStoryData.title.length > 0) {
                setLoading({ component: "button:save", loading: true })
                window.ipcRenderer.send("database:create-shortStory", shortStoryData);
                window.ipcRenderer.once("database:create-shortStory", (event, args) => {
                    setShorts({ shortStories: [{ dataValues: args }] });
                    setOpen();
                    setLoading({ component: "", loading: false });
                    setSnackbarMessage(`${shortStoryData.title} were created!`)
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
        setError({ error: false, msg: null });
        setShortStoryData({ ...shortStoryData, title: e.target.value })
    };
    const handlePlotChange = (e) => setShortStoryData({ ...shortStoryData, plot: e.target.value });
    const handleCompletedChange = (e) => setShortStoryData({ ...shortStoryData, completed: !shortStoryData.completed });
    return (
        <Box mt={4}>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h4">Add a short-story</Typography>
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
                            <Button variant="contained" color="primary" onClick={saveShort}>Save</Button>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "1em" }}>
                    <Grid item xs={12} md={8}>
                        <TextField
                            margin="normal"
                            style={{ marginTop: "0" }}
                            label="Short-story title"
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
                            label="Short-story plot"
                            variant="outlined"
                            size="medium"
                            onChange={handlePlotChange}
                            fullWidth
                        />
                        {error.error && <Typography style={{ color: "red", marginBottom: "1em" }} variant="body1">{error.msg}</Typography>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardHeader title="Completed?" subheader="Set if short story are already completed" />
                            <Divider />
                            <Box p={1}>
                                <Switch
                                    checked={shortStoryData.completed}
                                    onChange={handleCompletedChange}
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
        setShorts: (payload) => dispatch(addItem(payload)),
        setLoading: (payload) => dispatch(loadingAction(payload)),
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setSnackbarOpen: () => dispatch(setSnackbarOpen())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShort);