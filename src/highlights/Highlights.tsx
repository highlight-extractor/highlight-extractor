import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GridList, InputLabel } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    const getTopHighlights = (count: number): VideoHighlight[] => {
        let hts = predictions;
        hts.sort((a: VideoHighlight, b: VideoHighlight) => (a.meanScorePrediction < b.meanScorePrediction ? 1 : -1));
        hts = hts.slice(0, count);
        hts.sort((a: VideoHighlight, b: VideoHighlight) => (a.timestamp > b.timestamp ? 1 : -1));
        return hts;
    };

    const imagesPerRow = 3;
    let summaryImages = Math.min(predictions.length, 15);
    summaryImages = Math.floor(summaryImages / 3);
    summaryImages = summaryImages * 3;
    const highlights = getTopHighlights(summaryImages);
    const [values, setValues] = useState({ summaryImages, imagesPerRow, highlights });

    // TODO unavoidable any because of material-ui
    // ref: https://material-ui.com/guides/typescript/#handling-value-and-event-handlers
    const handleSelectChange = (event: any): void => {
        const { name, value } = event.target;
        if (name === 'summaryImages') {
            const hts = getTopHighlights(Number(value));
            setValues({ ...values, summaryImages: Number(value), highlights: hts });
        } else {
            setValues({ ...values, imagesPerRow: Number(value) });
        }
    };

    const summaryImagesOptions = [];
    for (let i = 1; i <= predictions.length; i += 1) {
        summaryImagesOptions.push(i);
    }
    const imagesPerRowOptions = [];
    for (let i = 0; i <= 4; i += 1) {
        imagesPerRowOptions.push(i);
    }

    useEffect(() => {
        document.title = 'Hl-Ext: Highlights';
    }, []);

    const classes = useStyles();
    return (
        <Container component="div" maxWidth="md" className={classes.paper}>
            <Typography component="h1" variant="h5">
                Highlights
            </Typography>
            <Grid container className={classes.gridContainer} justify="center" spacing={2}>
                <Grid item md={4} xs={8}>
                    <InputLabel shrink id="summaryImagesLabel">
                        Show me top
                    </InputLabel>
                    <Select
                        labelId="summaryImagesLabel"
                        id="summaryImages"
                        name="summaryImages"
                        className={classes.select}
                        value={values.summaryImages}
                        onChange={handleSelectChange}
                    >
                        {summaryImagesOptions.map(summaryImagesOption => (
                            <MenuItem key={summaryImagesOption} value={summaryImagesOption}>
                                {summaryImagesOption}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>out of {predictions.length} images</FormHelperText>
                </Grid>
                <Grid item md={4} xs={8}>
                    <InputLabel shrink id="imagesPerRowLabel">
                        in
                    </InputLabel>
                    <Select
                        labelId="imagesPerRowLabel"
                        id="imagesPerRow"
                        name="imagesPerRow"
                        className={classes.select}
                        value={values.imagesPerRow}
                        onChange={handleSelectChange}
                    >
                        {imagesPerRowOptions.map(imagesPerRowOption => (
                            <MenuItem key={imagesPerRowOption} value={imagesPerRowOption}>
                                {imagesPerRowOption == 0
                                    ? 'horizontal'
                                    : imagesPerRowOption == 1
                                    ? 'vertical'
                                    : `${imagesPerRowOption} columns`}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>view.</FormHelperText>
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
        </Container>
    );
};

const mapStateToProps = ({ highlights }: AppState): HighlightsState => highlights;

export default connect(mapStateToProps)(Highlights);
