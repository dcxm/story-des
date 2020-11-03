import React, { useState } from 'react'
import {
    Dialog,
    Slide
} from '@material-ui/core';
import OwnTab from "../OwnTab";

import AddNovel from "../AddNovel";
import AddShort from "../AddShort";

import DialogAppBar from "./DialogAppBar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddItemsDialog = ({ open, setOpen }) => {    

    const handleClose = () => setOpen(!open);

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <DialogAppBar title="Add items" handleClose={handleClose} />
            <OwnTab
                tabs={[
                    {
                        label: "Novel",
                        component: <AddNovel setOpen={handleClose}/>
                    },
                    {
                        label: "Short-story",
                        component: <AddShort setOpen={handleClose}/>
                    }
                ]}
            />
        </Dialog>
    )
}

export default AddItemsDialog
