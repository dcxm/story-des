import React from 'react'

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
    Card,
    CardHeader,
    CardContent,
    Button,
    Grid,
    Box,
    Container,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tabs,
    Tab
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const TextReaderDialog = ({ open, setOpen, text, title }) => {
    const handleClose = () => {
        setOpen();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={handleClose}
            scroll="body"
        >
            <Box
                my={2} mx={3}
                py={1} px={2}
                style={{ overflow: "hidden" }}
            >
                <Grid container alignItems="center">
                    <Grid xs={10}>
                        <Typography variant="h4">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid xs={2} align="right">
                        <IconButton color="secondary">
                            <CloseIcon onClick={handleClose} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box my={2} mx={2} py={2} px={3} style={{ overflow: "hidden" }}>
                <DialogContent>
                   {text && text.length > 0 ? <Typography
                        variant="body1"
                        style={{
                            lineHeight: "2em",
                            whiteSpace: "pre-wrap"
                    }}>
                        {text}
                    </Typography>
                    :
                    <Typography
                        variant="body1"
                        style={{lineHeight: "2em"}}
                    >
                        No content here.
                    </Typography>    
                }
                </DialogContent>
            </Box>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TextReaderDialog
