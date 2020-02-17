import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GridList } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../muiStyles';
import { AppState, HighlightsState, VideoHighlight } from '../store/appCommons';
import Highlight from './Highlight';

const getTimeTakenString = (timeTaken: number): string => {
    const factors = [1, 60, 60, 24];
    const names = ['seconds', 'minutes', 'hours', 'days'];
    let prevTime = timeTaken;
    let prevName = names[0];

    for (let i = 0; i < names.length; i += 1) {
        if (prevTime / factors[i] < 1) break;
        prevTime = prevTime / factors[i];
        prevName = names[i];
    }

    return prevTime.toFixed(2) + ' ' + prevName;
};

const Highlights = ({ predictions, timeTaken }: HighlightsState): React.ReactElement => {
    const summaryImages = predictions.length;
    const highlights = predictions;
    const imagesPerRow = 0;
    const [values, setValues] = useState({ summaryImages, imagesPerRow, highlights });

    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        if (name === 'summaryImages') {
            let hts = predictions;
            hts.sort((a: VideoHighlight, b: VideoHighlight) =>
                a.meanScorePrediction < b.meanScorePrediction ? 1 : -1,
            );
            hts = hts.slice(0, Number(value));
            hts.sort((a: VideoHighlight, b: VideoHighlight) => (a.timestamp > b.timestamp ? 1 : -1));
            setValues({ ...values, summaryImages: Number(value), highlights: hts });
        } else {
            setValues({ ...values, imagesPerRow: Number(value) });
        }
    };

    const classes = useStyles();
    const summaryImagesLimit = predictions.length;
    const helpText = `number of images to display (1 - ${summaryImagesLimit.toString()})`;
    return (
        <Container component="main" maxWidth="md">
            <div className={classes.root}>
                <Grid container className={classes.gridContainer} justify="center" spacing={2}>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="summaryImages"
                            label="Summary Images"
                            name="summaryImages"
                            type="number"
                            helperText={helpText}
                            inputProps={{ min: '1', max: summaryImagesLimit.toString(), step: '1' }}
                            value={values.summaryImages}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="imagesPerRow"
                            label="View (per row)"
                            name="imagesPerRow"
                            type="number"
                            helperText="0 for horizontal scroll"
                            inputProps={{ min: '0', max: values.highlights.length.toString(), step: '1' }}
                            value={values.imagesPerRow}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12}>
                        <GridList
                            className={classes.gridList}
                            style={values.imagesPerRow === 0 ? { flexWrap: 'nowrap' } : {}}
                        >
                            {values.highlights.map(highlight => (
                                <Highlight
                                    key={highlight.timestamp}
                                    highlight={highlight}
                                    width={values.imagesPerRow === 0 ? 80 : 100 / values.imagesPerRow}
                                />
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.gridContainer}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography component="span" variant="body2">
                            Server extracted highlights in {getTimeTakenString(timeTaken)}.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const mapStateToProps = ({ highlights }: AppState): HighlightsState => highlights;

export default connect(mapStateToProps)(Highlights);
