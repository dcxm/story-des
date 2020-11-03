import React, { useState } from 'react'
import { connect } from 'react-redux'
import setItems from '../../store/actions/setItems'
import addItem from '../../store/actions/addItem'

import {
    Dialog,
    TextField,
    FormControlLabel,
    Switch,
    Card,
    Grid,
    Box,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import SaveButton from "../buttons/SaveButton";
import DialogAppBar from "./DialogAppBar";

const AddChapterDialog = ({ id, open, setOpen, addItem }) => {
    const [chapterData, setChapterData] = useState({
        title: "",
        plot: "",
        completed: false
    });

    const handleTitleChange = (e) => setChapterData({ ...chapterData, title: e.target.value });
    const handlePlotChange = (e) => setChapterData({ ...chapterData, plot: e.target.value });
    const handleCompletedSwitchChange = () => setChapterData({ ...chapterData, completed: !chapterData.completed });

    const handleClose = () => {
        setOpen();
    };

    const handleSave = (loadOn, loadOff) => {
        loadOn();
        window.ipcRenderer.send("database:create-chapter", { novelId: id, ...chapterData });
        window.ipcRenderer.once("database:create-chapter", (event, args) => {
            addItem({chapters: [args]});
            setOpen();
            loadOff();
        })
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            scroll="body"
        >
            <DialogAppBar title="Add Chapter" handleClose={handleClose} />
            <DialogContent>
                <Box mt={4} p={1} style={{ overflow: "hidden" }}>
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={8}>
                            <TextField
                                style={{ marginTop: "0" }}
                                margin="normal"
                                label="Chapter title"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                required
                                helperText="This field is required"
                                onChange={handleTitleChange}
                            />
                            <TextField
                                margin="normal"
                                multiline
                                label="Chapter plot"
                                variant="outlined"
                                size="medium"
                                onChange={handlePlotChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <Box p={2}>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={chapterData.completed}
                                            onChange={handleCompletedSwitchChange}
                                            name="isChapters"
                                            color="primary"
                                        />}
                                        label="is this chapter already completed?"
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>


            </DialogContent>
            <DialogActions>
                <SaveButton saveAction={handleSave} />
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = ({ chapters }) => {
    return {
        chapters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setItems: payload => dispatch(setItems(payload)),
        addItem: payload => dispatch(addItem(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChapterDialog)
