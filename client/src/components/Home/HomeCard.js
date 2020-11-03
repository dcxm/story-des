import React from 'react'
import SimpleItemList from "./SimpleItemList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const HomeCard = ({ cardTitle, data, loading, type }) => {
    return (
        <Grid item md={6} xs={12}>
            <Card>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={6}>
                        <CardHeader title={cardTitle} />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        align="right"
                        p={10}
                        style={{ paddingRight: "10px" }}
                    >
                        Items: <Chip label={data ? data.length : 0} color="primary" />
                    </Grid>
                </Grid>
                <Divider />
                <CardContent>
                    {loading.loading && loading.component === "getData" ? <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}><CircularProgress color="primary" disableShrink style={{ margin: "2em" }} /></div> :
                        <SimpleItemList data={data} type={type} />
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default HomeCard
