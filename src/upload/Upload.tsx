import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone/dist';
import { useStyles } from '../muiStyles';
import { generateHighlights } from '../store/actions/uploadActions';
import { UploadActionParams, UploadDispatchProps, UploadState } from '../store/commons/uploadCommons';
import { AppState } from '../store/reducers/rootReducer';

type UploadProps = UploadState & UploadDispatchProps;

// ref: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
// above demo ref: https://material-ui.com/getting-started/templates/sign-up/
// dropzone ref: https://www.npmjs.com/package/material-ui-dropzone
const Upload = (props: UploadProps): React.ReactElement => {
    const classes = useStyles();
    const { video, timeFrame, sceneImages, generateHighlights } = props;
    const initialFiles: File[] = [];
    if (video) {
        initialFiles.push(video);
    }
    const isSubmitDisabled = initialFiles.length === 0;
    const [values, setValues] = useState({ initialFiles, timeFrame, sceneImages, isSubmitDisabled });

    // called every time a file's `status` changes
    const onFileChange = (files: File[]): void => {
        // TODO fix the error thrown when the file size is large
        setValues({ ...values, initialFiles: files, isSubmitDisabled: files.length === 0 });
    };

    const onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        setValues({ ...values, [name]: Number(value) });
    };

    const onSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (values.initialFiles.length === 1) {
            generateHighlights({
                video: values.initialFiles[0],
                timeFrame: values.timeFrame,
                sceneImages: values.sceneImages,
            });
        } else {
            // avoid browser side hack
            setValues({ ...values, isSubmitDisabled: true });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
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
                                initialFiles={initialFiles.map(file => file.name)}
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
                                value={values.timeFrame || 0}
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
                                helperText="Maximum number of images from each scene"
                                value={values.sceneImages || 0}
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
                        disabled={values.isSubmitDisabled}
                    >
                        Upload
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = ({ upload }: AppState): UploadState => ({ ...upload });

const mapDispatchToProps = (dispatch: Dispatch<UploadActionParams>): UploadDispatchProps => ({
    generateHighlights: (uploadData: UploadState): void => generateHighlights(uploadData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
