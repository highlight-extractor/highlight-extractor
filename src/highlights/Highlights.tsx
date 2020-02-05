import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GridList } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../muiStyles';
import { VideoHighlight, HighlightsState } from '../store/commons/highlightCommons';
import { AppState } from '../store/reducers/rootReducer';
import Highlight from './Highlight';

const Highlights = ({ predictions }: HighlightsState): React.ReactElement => {
    const summaryImages = predictions.length;
    const highlights = predictions;
    const [values, setValues] = useState({ summaryImages, highlights });

    const onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { value } = event.currentTarget;
        let hts = predictions;
        hts.sort((a: VideoHighlight, b: VideoHighlight) => (a.meanScorePrediction < b.meanScorePrediction ? 1 : -1));
        hts = hts.slice(0, Number(value));
        hts.sort((a: VideoHighlight, b: VideoHighlight) => (a.timestamp > b.timestamp ? 1 : -1));
        setValues({ ...values, summaryImages: Number(value), highlights: hts });
    };

    const classes = useStyles();
    const summaryImagesLimit = predictions.length;
    const helpText = `number of images to display (0 - ${summaryImagesLimit.toString()})`;
    return (
        <Container component="main" maxWidth="md">
            <div className={classes.root}>
                <Grid
                    container
                    className={classes.gridContainer}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="summaryImages"
                            label="Summary Images"
                            name="summaryImages"
                            type="number"
                            helperText={helpText}
                            inputProps={{ min: '0', max: summaryImagesLimit.toString(), step: '1' }}
                            value={values.summaryImages}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12}>
                        <GridList className={classes.gridList}>
                            {values.highlights.map(highlight => (
                                <Highlight key={highlight.timestamp} highlight={highlight} />
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const mapStateToProps = ({ highlights }: AppState): HighlightsState => {
    return { ...highlights };
};

export default withRouter(connect(mapStateToProps)(Highlights));
