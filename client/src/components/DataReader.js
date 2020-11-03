import React, { Fragment, useState } from 'react'

import {
    Typography,
    Button,
    Box
} from '@material-ui/core';

import TextReaderDialog from "./dialogs/TextReaderDialog";

const DataReader = ({ dialogTitle, text, textMaxLength, buttonText, noDataText }) => {
    const [textReaderDialogOpen, setTextReaderDialogOpen] = useState(false);

    const handleTextReaderDialogOpen = () => setTextReaderDialogOpen(!textReaderDialogOpen);

    return (
        <Fragment>
            {text ?
                text.length > textMaxLength || text.length > 500 ?
                    <Box>
                        <Typography
                            variant="body1"
                            style={{
                                lineHeight: "2em",
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {text.substring(0, textMaxLength ? textMaxLength : 500)}...
                        </Typography>
                        <Button
                            variant="outlined"
                            style={{ marginTop: "1em" }}
                            onClick={handleTextReaderDialogOpen}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                    : <Box>
                        <Typography
                            variant="body1"
                            style={{
                                lineHeight: "2em",
                                whiteSpace: "pre-wrap" 
                            }}
                        >
                            {text}
                        </Typography>
                        <Button
                            variant="outlined"
                            style={{ marginTop: "1em" }}
                            onClick={handleTextReaderDialogOpen}
                        >
                            {buttonText ? buttonText
                                : "Read text"
                            }
                        </Button>
                    </Box>
                :
                <Typography variant="body1">
                    {noDataText ? noDataText
                        : "No added text here!"
                    }
                </Typography>
            }
            <TextReaderDialog
                open={textReaderDialogOpen}
                setOpen={setTextReaderDialogOpen}
                text={text}
                title={dialogTitle}
            />
        </Fragment>
    )
}

export default DataReader
