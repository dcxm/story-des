import React, { Fragment, useState } from 'react'
import { connect } from "react-redux"
import {
    Card,
    CardContent,
    Grid,
    Box,
    Collapse
} from '@material-ui/core';

import AddChapterButton from './buttons/AddChapterButton';
import AddChapterDialog from "./dialogs/AddChapterDialog";
import Chapters from "./Chapters";
import AppBarCardHeader from "../components/AppBarCardHeader";
import CollapseCardButton from "../components/buttons/CollapseCardButton";

const ChaptersCard = ({ chapterOpen, setChapterOpen, novellId }) => {
    const [chaptersShown, setChaptersShown] = useState(true);
    return (
        <Card style={{ marginTop: "2em", marginBottom: "2em" }}>
            <AppBarCardHeader
                headerActions={
                    <Fragment>
                        <CollapseCardButton
                            handleCollapse={setChaptersShown}
                            collapsed={chaptersShown}
                            tooltip={{
                                text: `${!chaptersShown ? "Expand" : "Collapse"} chapters`,
                                placement: "left"
                            }}
                            style={{ marginRight: ".5em" }}
                        />
                        <AddChapterButton tooltip={{ placement: "left", text: "Add chapter" }} />
                    </Fragment>
                }
                titleText="Chapters"
                titleVariant="h5"
            />
            <Collapse in={chaptersShown} timeout={250} unmountOnExit>
                <CardContent>
                    <Chapters />
                </CardContent>
            </Collapse>
            <AddChapterDialog open={chapterOpen} setOpen={setChapterOpen} id={novellId} />
        </Card>
    )
}

const mapStateToProps = (state) => {
    const { chapterOpen } = state;
    return {
        chapterOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChapterOpen: () => dispatch({ type: "SET_ADD_CHAPTER_OPEN" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersCard)
