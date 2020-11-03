import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import getItemsAction from "../store/actions/getItemsAction";
import updateItem from "../store/actions/updateItem";

import { useParams } from 'react-router-dom'

import { Button, Typography, Box, Grid, Container, CardHeader, CardContent, Card } from "@material-ui/core";

import SimpleListActions from "../components/Home/SimpleListActions"
import TextReaderDialog from "../components/dialogs/TextReaderDialog"
import CompletedButton from '../components/buttons/CompletedButton'

const ItemsList = ({ novels, shortStories, getItems, updateItem }) => {
    const { type } = useParams();
    const [plotDialogOpen, setPlotDialogOpen] = useState();
    const [plotReaderItem, setPlotReaderItem] = useState({});
    const [clearedType, setClearedType] = useState('');
    
    useEffect(() => {
        getItems("novel", "novels")
        getItems("shortStory", "shortStories")
        if (type === 'novels') setClearedType('novels')
        if (type === 'short-stories') setClearedType('short stories')
    }, [type])

    const items = type === 'novels' ? novels : shortStories

    return (
        <div>
            <Container maxWidth="lg">
                <Typography variant="h4">{clearedType.slice(0, 1).toUpperCase() + clearedType.slice(1)}</Typography>
                {items.length === 0 ? <Box mb={3} mt={3}>
                    <Card>
                        <Box pl={2} py={2}>
                            No added {clearedType}
                        </Box>
                    </Card>
                </Box>
                    : items.map(({ dataValues }) => (
                        <>
                            <Box mb={3} mt={3}>
                                <Card>
                                    <Box py={2} px={3}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={5} md={6}>
                                                <Typography variant="h5">{dataValues.title}</Typography>
                                            </Grid>
                                            <Grid item xs={1} align='center'>
                                                <CompletedButton item={dataValues} completed={dataValues.completed} type={type} />
                                            </Grid>
                                            <Grid item xs={2} align='center'>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setPlotReaderItem(dataValues)
                                                        setPlotDialogOpen(!plotDialogOpen)
                                                    }}
                                                >
                                                    Read plot
                                                </Button>
                                            </Grid>
                                            <Grid item xs={4} md={3} align="right">
                                                <SimpleListActions id={dataValues.id} type={type === 'short-stories' ? 'short-story' : 'novels'} itemName={dataValues.title} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Card>
                            </Box>
                        </>
                    ))}
                <TextReaderDialog
                    open={plotDialogOpen}
                    setOpen={() => setPlotDialogOpen(!plotDialogOpen)}
                    title={`"${plotReaderItem.title}" plot`}
                    text={plotReaderItem.plot}
                />
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    const { novels, shortStories } = state.items;
    return {
        novels,
        shortStories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: (modelName, object) => dispatch(getItemsAction(modelName, object)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
