import React, { useState } from 'react'
import {
    Dialog,
    Toolbar,
    Typography,
    DialogContent,
    Divider,
    FormLabel,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Grid,
    Checkbox,
    CircularProgress,
    Button,
    AppBar,
    Slide,
    IconButton,
    DialogActions,
    Box
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

import DialogAppBar from './DialogAppBar'
import SaveButton from '../buttons/SaveButton'

const DownloadDialog = ({ open, setOpen, itemId, type, loading }) => {
    const [settings, setSettings] = useState({
        id: itemId,
        includeTitles: false,
        fileExtension: 'pdf'
    })
    const [error, setError] = useState('');

    const handleIncludeTitlesChange = e => setSettings({ ...settings, includeTitles: !settings.includeTitles })

    const handleExtensionChange = e => setSettings({ ...settings, fileExtension: e.target.value })

    const handleOpen = () => setOpen();


    const handleSave = (setLoadOn, setLoadOff) => {
        console.log(type)
        window.ipcRenderer.send(`download:${type}`, settings)
        window.ipcRenderer.once(`download:${type}`, (event, args) => {
            if (args.error === 'No content') {
                setError(`No content in this ${type === 'novels' ? 'novel' : 'short story'}. Please add content to it, then save!`)
            }
        })
    }

    return (
        <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleOpen}>
            <DialogAppBar title="Download" handleClose={handleOpen} />
            <DialogContent>
                <Box my={4} mx={3} style={{ overflow: "hidden" }}>
                    {error && <Typography variant="body1" style={{ color: 'red', marginBottom: '1em' }}>{error}</Typography>}
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">File extension</Typography>
                            <Box mx={2} my={2}>
                                <RadioGroup onChange={handleExtensionChange} value={settings.fileExtension}>
                                    <FormControlLabel value="docx" control={<Radio />} label="Docx" />
                                    <FormControlLabel value="md" control={<Radio />} label="Markdown" />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">Settings</Typography>
                            <Box mx={2} my={2}>
                                <FormControlLabel
                                    label="Include titles in the beginning"
                                    control={
                                        <Checkbox
                                            checked={settings.includeTitles}
                                            onChange={handleIncludeTitlesChange}
                                        />
                                    }
                                />
                            </Box>
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

export default DownloadDialog
