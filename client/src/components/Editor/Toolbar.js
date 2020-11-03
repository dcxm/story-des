import React, { Fragment, useState } from 'react'
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
// import option from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


const Toolbar = ({ editedTitle, style, saveContent, display }) => {
    const classes = useStyles();
    const save = () => saveContent();
    return (
        <Fragment>
            <div id="toolbar" style={{ ...style, boxShadow: "0 0 8px gray" }} >
                <div className="contain">
                    <span className="ql-formats" style={{ marginRight: "1em" }}>
                        {editedTitle && editedTitle.length >= 30 ?
                        <Tooltip placement="bottom" title={editedTitle}>
                            <Typography variant="h6">
                                {editedTitle.slice(0, 30)}...
                            </Typography>
                        </Tooltip>
                            :
                            <Typography variant="h6">
                                {editedTitle}
                            </Typography>
                        }
                    </span>
                    <span className="ql-formats">
                        <FormControl className={classes.margin}>
                            <Select native
                                inputProps={{
                                    className: "ql-header",
                                    defaultValue: ""
                                }}
                                onChange={(e) => e.preventDefault()}
                                onClick={(e) => e.preventDefault()}
                                onOpen={(e) => e.preventDefault()}
                            >
                                <option value="1" onClick={save}>Heading 1</option>
                                <option value="2" onClick={save}>Heading 2</option>
                                <option value="3" onClick={save}>Heading 3</option>
                                <option value="4" onClick={save}>Heading 4</option>
                                <option value="5" onClick={save}>Heading 5</option>
                                <option value="6" onClick={save}>Heading 6</option>
                                <option value="" onClick={save}>Normal</option>
                            </Select>
                        </FormControl>
                    </span>
                    <span className="ql-formats">
                        <Button color="primary" onClick={save} className="ql-align" value=""></Button>
                        <Button color="primary" onClick={save} className="ql-align" value="center"></Button>
                        <Button color="primary" onClick={save} className="ql-align" value="right"></Button>
                        <Button color="primary" onClick={save} className="ql-align" value="justify"></Button>
                    </span>
                    <span className="ql-formats">
                        <Button className="ql-bold" onClick={save}></Button>
                        <Button className="ql-italic" onClick={save}></Button>
                        <Button className="ql-underline" onClick={save}></Button>
                    </span>
                </div>
            </div >
        </Fragment >
    )
}

export default Toolbar
