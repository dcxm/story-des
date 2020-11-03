import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from "react-router-dom"
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Grid,
    Box,
    Container,
} from '@material-ui/core'

import { connect } from "react-redux"
import getItemsAction from "../store/actions/getItemsAction"

import ChaptersCard from "../components/ChaptersCard"
import EditDetailsDialog from '../components/dialogs/EditDetailsDialog'
import EditButton from "../components/buttons/EditButton"
import AppBarCardHeader from "../components/AppBarCardHeader"
import DataReader from "../components/DataReader"
import DetailsItemDataCard from "../components/DetailsItemDataCard"
import CompletedButton from '../components/buttons/CompletedButton'

const Details = ({ novels, shortStories, chapters, getItemsToStore }) => {
    const { type, id } = useParams()
    const [item, setItem] = useState({})
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const getCurrentItem = useCallback(() => {
        const foundItem = type === "novels" ?
            novels.find(({ dataValues }) => dataValues.id.toString() === id.toString())
            : 
            shortStories.find(({ dataValues }) => dataValues.id.toString() === id.toString())
        if (foundItem === undefined) {
            return;
        } else {
            setItem(foundItem.dataValues)
        }
    }, [novels, shortStories])

    const getItems = useCallback(() => {
        getItemsToStore(type === "novels" ? "novel" : "shortStory", type === 'novels' ? type : 'shortStories')
    }, [novels, shortStories])

    useEffect(() => {
        if (type === 'novels' && novels.length === 0 || type === 'shorts' && shortStories.length === 0) {
            getItems()
            getCurrentItem()
            if (type === 'novels') {
                getItemsToStore('chapter', 'chapters', null, {novelId: id})
            }
        } else {
            getCurrentItem()
            if (type === 'novels') {
                getItemsToStore('chapter', 'chapters', null, {novelId: id})
            }
        }
    }, [getItems, getCurrentItem])

    const handleEditDialogOpen = () => setEditDialogOpen(!editDialogOpen)

    const creaAt = (timestamp) => {
        const date = new Date(timestamp)
        const addZero = (num) => (parseInt(num) < 10 ? `0${num}` : num)
        return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
            date.getDay()
        )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
            date.getSeconds()
        )}`
    }

    return (
        <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <AppBarCardHeader
                                titleText={item.title}
                                headerActions={
                                    <EditButton onClick={handleEditDialogOpen} tooltip={{ placement: "left" }} />
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={2} style={{ marginTop: ".5em", marginBottom: ".5em" }}>
                                    <Grid item xs={12} md={8}>
                                        <Box p={3} pt={2}>
                                            <Box mb={3}>
                                                <Typography variant="h5" style={{ marginBottom: ".4em" }}>Plot</Typography>
                                            </Box>
                                            <DataReader
                                                dialogTitle={`${item.title} plot`}
                                                text={item.plot}
                                                buttonText="Read Whole Plot"
                                                noDataText="No added plot here!"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{ marginTop: ".5em", marginBottom: ".5em" }}>
                                        <DetailsItemDataCard>
                                            <Typography variant="body1"><strong>Created at:</strong> {creaAt(item.createdAt)}</Typography>
                                            <Box>
                                                <CompletedButton item={item} type={type} style={{ marginRight: '.5em', marginTop: '-.15em' }} tooltip={{ placement: 'bottom' }} />
                                                {item.completed ? "Completed" : "Not completed"}
                                            </Box>
                                        </DetailsItemDataCard>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            {
                type === "novels" && <ChaptersCard novellId={id} chapters={chapters}/>
            }
            <EditDetailsDialog type={type} open={editDialogOpen} setOpen={handleEditDialogOpen} item={item} setItem={setItem} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { novels, shortStories, chapters } = state.items
    return {
        novels,
        shortStories,
        chapters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEditDialogOpen: () => dispatch({ type: "SET_EDIT_DIALOG_OPEN" }),
        getItemsToStore: (modelName, object, loadingComponent, data) => dispatch(getItemsAction(modelName, object, loadingComponent, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
