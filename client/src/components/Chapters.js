import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import setItems from '../store/actions/setItems'
import deleteItemsAction from '../store/actions/deleteItemsAction'
import getItemsAction from "../store/actions/getItemsAction";
import updateItem from '../store/actions/updateItem'

import {
    Typography,
    Box,
} from '@material-ui/core';

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ChapterItem from "./ChapterItem";

import { useHistory } from "react-router-dom";
import EditDetailsDialog from "./dialogs/EditDetailsDialog";

import chapterCardOnDragEnd from "../lib/chapterCardOnDragEnd"


const Chapters = ({ chapters, setItems, getItemsToStore, deleteItems, updateItem, novelId }) => {
    const history = useHistory();
    const [data, setData] = useState({});
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState({});

    useEffect(() => {
        setData({
            ...data,
            chapters: [...chapters],
        columns: {
            "col-1": {
                id: "col-1",
                title: "Chapter Order",
                chapterIds: [...chapters]
            }
        }
        })
    }, [chapters])

    const onDragEndI = provided => chapterCardOnDragEnd(provided, data, setData, setItems);

    const handleDelete = (setSnacbarMessage, setSnackbarOpen, loading, setLoading, sendData, stateIndex) => {
        setLoading({ loading: true, component: `chapter-item:${sendData.id}` })
        window.ipcRenderer.send("database:delete-chapter", sendData)
        window.ipcRenderer.once("database:delete-chapter", () => {
            let newChaptersClone = Array.from(data.chapters);
            newChaptersClone.splice(stateIndex, 1);
            const newState = {
                chapters: newChaptersClone,
                columns: {
                    "col-1": {
                        ...data.columns["col-1"],
                        chapterIds: newChaptersClone
                    }
                }
            }
            setData(newState)
            setItems({ chapters: newChaptersClone })
            setSnacbarMessage(`${sendData.title} was deleted!`)
            setSnackbarOpen()
            setLoading({ loading: false, component: "" })
        })
    }

    const handleEdit = (item) => {
        setEditDialogOpen(!editDialogOpen)
        setEditItem(item)
    };

    const updateChapterState = (id, updatedValues) => {
        const newItemIndex = chapters.findIndex(item => item.dataValues.id.toString() === id.toString());
        const newItem = {
            ...chapters[newItemIndex],
            dataValues: {
                ...chapters[newItemIndex].dataValues,
                ...updatedValues
            }
        }
        const dataClone = Object.assign({}, data)
        dataClone.chapters[newItemIndex] = newItem
        dataClone.columns["col-1"].chapterIds[newItemIndex] = newItem
        setData(dataClone)
        console.log('DATAA---', data)
    }

    const editAction = (formState, setSnackbarOpen, setSnackbarMessage, setLoadOn, setLoadOff) => {
        updateChapterState(formState.id, formState)
        updateItem('chapter', 'chapters', formState)
        setEditDialogOpen(false)
        setSnackbarMessage("Chapter were updated")
        setSnackbarOpen()
    }

    const handleWrite = (id) => {
        history.push(`/chapter/edit/${id}`)
    }

    return (
        <>
            {chapters && <DragDropContext onDragEnd={onDragEndI}>
                {data.chapters && data.chapters.length > 0 ?
                    <Droppable droppableId={data.columns["col-1"].id}>
                        {provided =>
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {data.chapters.map(({ dataValues }, index) =>
                                    <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                        <ChapterItem
                                            key={dataValues.id}
                                            index={index}
                                            item={dataValues}
                                            handleWrite={() => handleWrite(dataValues.id)}
                                            handleEdit={handleEdit}
                                            handleDelete={
                                                (setSnackbarMessage, setSnackbarOpen, loading, setLoading, itemId) => handleDelete(
                                                    setSnackbarMessage, setSnackbarOpen, loading, setLoading, dataValues, index
                                                )
                                            }
                                        />
                                    </div>
                                )}
                                {provided.placeholder}
                            </div>
                        }
                    </Droppable>
                    : <Box ml={1} mt={2}><Typography variant="body1">No added chapters here!</Typography></Box>
                }
            </DragDropContext >}
            <EditDetailsDialog
                item={editItem}
                setItem={setEditItem}
                open={editDialogOpen}
                setOpen={handleEdit}
                action={editAction}
                type="chapters"
            />
        </>
    )
}

const mapStateToProps = state => {
    const { chapters } = state.items
    return {
        chapters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setItems: payload => dispatch(setItems(payload)),
        deleteItems: (modelName, object, id) => dispatch(deleteItemsAction(modelName, object, id)),
        updateItem: (modelName, object, data) => dispatch(updateItem(modelName, object, data)),
        getItemsToStore: (modelName, object, loading, data) => dispatch(getItemsAction(modelName, object, loading, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapters)
