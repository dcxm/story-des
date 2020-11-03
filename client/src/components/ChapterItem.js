import React, { useState } from 'react'
import {
    Card,
    Button,
    Grid,
    Box
} from '@material-ui/core';
import { useTheme } from "@material-ui/styles";
import { Draggable } from "react-beautiful-dnd";

import WriteButton from "./buttons/WriteButton";
import EditButton from "./buttons/EditButton"
import DeleteButton from "./buttons/DeleteButton";

import SmallCircularLoading from "./SmallCircularLoading";

import { connect } from "react-redux";

import TextReaderDialog from "./dialogs/TextReaderDialog";

const ChapterItem = ({ item, index, handleWrite, handleEdit, handleDelete, loading }) => {
    const theme = useTheme();
    const [plotDialogOpen, setPlotDialogOpen] = useState();
    return (
        <>
            {loading.loading && loading.component === `chapter-item:${item.id}` ?
                <Card variant="outlined">
                    <SmallCircularLoading />
                </Card>
                :
                <Draggable draggableId={item.id.toString()} index={index}>
                    {provided =>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card
                                variant="outlined"
                            >
                                <Box py={4} px={2}>
                                    <Box style={{ fontWeight: 900, fontSize: "1.2em" }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={1} align="center">
                                                {index + 1}.
                                        </Grid>
                                            <Grid item xs={6}>
                                                {item.title}
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setPlotDialogOpen(!plotDialogOpen)}
                                                >
                                                    Read plot
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3} align="right">
                                                <WriteButton
                                                    onClick={handleWrite}
                                                    tooltip={{ placement: "bottom" }} />
                                                <EditButton
                                                    onClick={() => handleEdit(item)}
                                                    tooltip={{ placement: "bottom" }}
                                                    style={{ color: theme.palette.secondary.dark }} />
                                                <DeleteButton
                                                    handleDelete={handleDelete}
                                                    snackbarMessage={`${item.title.length > 0 && item.title[0].toUpperCase() + item.title.slice(0)} was deleted!`}
                                                    tooltip={{ placement: "bottom" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Card>
                        </div>
                    }
                </Draggable>
            }
            <TextReaderDialog
                open={plotDialogOpen}
                setOpen={() => setPlotDialogOpen(!plotDialogOpen)}
                title={`"${item.title}" plot`}
                text={item.plot}
            />
        </>
    )
}

const mapStateToProps = state => {
    const { loading } = state;
    return {
        loading
    }
}

export default connect(mapStateToProps)(ChapterItem)
