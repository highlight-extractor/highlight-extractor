import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { DropzoneArea } from 'material-ui-dropzone/dist';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import { UploadFormParams, UploadFormState } from '../store/commons/uploadCommons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        dropzone: {
            minHeight: 'inherit',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);

type UploadFormProps = UploadFormState & UploadFormParams;

// ref: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
// above demo ref: https://material-ui.com/getting-started/templates/sign-up/
// dropzone ref: https://www.npmjs.com/package/material-ui-dropzone
// TODO add return type for this function
function UploadForm(props: UploadFormProps) {
    const classes = useStyles();
    const { onFileChange, onInputChange, onSubmit } = props;
    const { video, timeFrame, samplingRate, sceneImages, summaryImages } = props;
    const initialFiles: string[] = [];
    if (video) {
        initialFiles.push(video.name);
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Upload
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DropzoneArea
                            dropzoneClass={classes.dropzone}
                            acceptedFiles={['video/*']}
                            filesLimit={1}
                            maxFileSize={2000000000}
                            dropzoneText="Drag and drop a video file or click"
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview={true}
                            initialFiles={initialFiles}
                            onChange={onFileChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="timeFrame"
                            label="Time Frame"
                            name="timeFrame"
                            type="number"
                            helperText="Minimum time of each scene"
                            value={timeFrame}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="samplingRate"
                            label="Sampling Rate"
                            name="samplingRate"
                            type="number"
                            helperText="Maximum number of images you want to go through in each time-frame"
                            value={samplingRate}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="sceneImages"
                            label="Scene Images"
                            name="sceneImages"
                            type="number"
                            helperText="Maximum number of images from each scene you select to be in the summary"
                            value={sceneImages}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="summaryImages"
                            label="Summary Images"
                            name="summaryImages"
                            type="number"
                            helperText="Maximum number of images you want in the summary"
                            value={summaryImages}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit}
                >
                    Upload
                </Button>
            </form>
        </div>
    );
}

export default UploadForm;
