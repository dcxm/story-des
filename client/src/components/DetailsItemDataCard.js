import React, { Fragment, useState, useEffect } from 'react'
import { Card, Box, Divider } from "@material-ui/core";

const DetailsItemDataCard = ({ children }) => {
    const [cardElement, setCardElement] = useState(null);
    useEffect(() => {
        console.log(cardElement)
    }, [])
    return (
        <Card variant="outlined" innerRef={(el) => setCardElement(el)}>
            {children.map((child, index) => (
                <Fragment>
                    <Box p={2}>
                        {child}
                    </Box>
                    {index !== children.length -1 && <Divider />}
                </Fragment>
            ))}
        </Card>
    )
}

export default DetailsItemDataCard
