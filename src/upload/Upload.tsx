import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone/dist';
import { useStyles } from '../muiStyles';
import { ActionParams, AppState, UploadDispatchProps, UploadState } from '../store/appCommons';
import { callGenerateHighlights } from '../store/storeActions';

type UploadProps = UploadState & UploadDispatchProps;

// ref: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
// above demo ref: https://material-ui.com/getting-started/templates/sign-up/
// dropzone ref: https://www.npmjs.com/package/material-ui-dropzone
const Upload = (props: UploadProps): React.ReactElement => {
    const classes = useStyles();
    const { video, clipTime, imagesPerClip, mode, imageExtension, generateHighlights } = props;
    const initialFiles: File[] = [];
    if (video) {
        initialFiles.push(video);
    }
    const isSubmitDisabled = initialFiles.length === 0;
    const [values, setValues] = useState({
        initialFiles,
        clipTime,
        imagesPerClip,
        mode: mode || 'human_eye',
        imageExtension,
        isSubmitDisabled,
    });

    // called every time a file's `status` changes
    // TODO fix the error thrown when the file size is large
    const handleFileChange = (files: File[]): void =>
        setValues({ ...values, initialFiles: files, isSubmitDisabled: files.length === 0 });

    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        setValues({ ...values, [name]: Number(value) });
    };

    // TODO unavoidable any because of material-ui
    // ref: https://material-ui.com/guides/typescript/#handling-value-and-event-handlers
    const handleSelectChange = (event: any): void => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (values.initialFiles.length === 1) {
            generateHighlights({
                video: values.initialFiles[0],
                clipTime: values.clipTime,
                imagesPerClip: values.imagesPerClip,
                mode: values.mode,
                imageExtension: values.imageExtension,
            });
        } else {
            // avoid browser side hack
            setValues({ ...values, isSubmitDisabled: true });
        }
    };

    return (
        <Container component="div" maxWidth="xs" className={classes.paper}>
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
                            maxFileSize={1000000000}
                            dropzoneText="Drag and drop a video file or click"
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview={true}
                            initialFiles={initialFiles.map(file => file.name)}
                            onChange={handleFileChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="clipTime"
                            label="Clip Time"
                            name="clipTime"
                            type="number"
                            helperText="Minimum time of each clip"
                            inputProps={{ min: '1', step: '1' }}
                            value={values.clipTime}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="imagesPerClip"
                            label="Images Per Clip"
                            name="imagesPerClip"
                            type="number"
                            helperText="Maximum number of images per each clip"
                            inputProps={{ min: '1', step: '1' }}
                            value={values.imagesPerClip}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="modeLabel">
                            Mode
                        </InputLabel>
                        <Select
                            labelId="modeLabel"
                            id="mode"
                            name="mode"
                            className={classes.select}
                            value={values.mode}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'human_eye'}>Human Eye</MenuItem>
                            <MenuItem value={'scene_detect'}>Scene Detect</MenuItem>
                        </Select>
                        <FormHelperText>Prediction generation mode</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="imageExtensionLabel">
                            Image Extension
                        </InputLabel>
                        <Select
                            labelId="imageExtensionLabel"
                            id="imageExtension"
                            name="imageExtension"
                            className={classes.select}
                            value={values.imageExtension}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'jpg'}>JPG</MenuItem>
                        </Select>
                        <FormHelperText>Expected type of images</FormHelperText>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={values.isSubmitDisabled}
                >
                    Upload
                </Button>
            </form>
        </Container>
    );
};

const mapStateToProps = ({ upload }: AppState): UploadState => upload;

const mapDispatchToProps = (dispatch: Dispatch<ActionParams>): UploadDispatchProps => ({
    generateHighlights: (uploadData: UploadState): void => callGenerateHighlights(uploadData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
