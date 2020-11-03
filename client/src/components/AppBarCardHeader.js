import React from 'react';

import {
    Typography,
    AppBar,
    Grid,
    Box
} from '@material-ui/core';

const AppBarCardHeader = ({ headerActions, titleText, titleVariant }) => {
    return (
        <AppBar position="static" color="primary">
            <Box px={3} py={3}>
                <Grid container alignItems="center">
                    <Grid item xs={headerActions ? 8 : 12}>
                        <Typography
                            variant={titleVariant ? titleVariant : "h4"}
                        >
                            {titleText}
                        </Typography>
                    </Grid>
                    {headerActions &&
                        <Grid item xs={4} align="right">
                            {headerActions}
                        </Grid>
                    }
                </Grid>
            </Box>
        </AppBar>
    )
}

export default AppBarCardHeader
