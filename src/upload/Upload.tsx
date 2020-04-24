import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    const { video, totalClips, imagesPerClip, mode, imageExtension, generateHighlights } = props;
    const initialFiles: File[] = [];
    if (video) {
        initialFiles.push(video);
    }
    const isSubmitDisabled = initialFiles.length === 0;
    const [values, setValues] = useState({
        initialFiles,
        totalClips: totalClips || 15,
        imagesPerClip: imagesPerClip || 1,
        mode: mode || 'human_eye',
        imageExtension: imageExtension || 'jpg',
        isSubmitDisabled,
    });

    // called every time a file's `status` changes
    // TODO fix the error thrown when the file size is large
    const handleFileChange = (files: File[]): void =>
        setValues({ ...values, initialFiles: files, isSubmitDisabled: files.length === 0 });

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
                totalClips: values.totalClips,
                imagesPerClip: values.imagesPerClip,
                mode: values.mode,
                imageExtension: values.imageExtension,
            });
        } else {
            // avoid browser side hack
            setValues({ ...values, isSubmitDisabled: true });
        }
    };

    const imagesPerClipOptions = [];
    for (let i = 1; i <= 5; i += 1) {
        imagesPerClipOptions.push(i);
    }
    const totalClipsOptions = [];
    for (let i = 1; i <= 25; i += 1) {
        totalClipsOptions.push(i);
    }
    const thresholdOptions = [];
    for (let i = 50; i <= 95; i += 5) {
        thresholdOptions.push(i);
    }

    useEffect(() => {
        document.title = 'Hl-Ext: Upload';
    }, []);

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
                        <InputLabel shrink id="modeLabel">
                            Using
                        </InputLabel>
                        <Select
                            labelId="modeLabel"
                            id="mode"
                            name="mode"
                            className={classes.select}
                            value={values.mode}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'human_eye'}>human-eye</MenuItem>
                            <MenuItem value={'scene_detect'}>scene-detect</MenuItem>
                        </Select>
                        <FormHelperText>mode</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="imagesPerClipLabel">
                            show me
                        </InputLabel>
                        <Select
                            labelId="imagesPerClipLabel"
                            id="imagesPerClip"
                            name="imagesPerClip"
                            className={classes.select}
                            value={values.imagesPerClip}
                            onChange={handleSelectChange}
                        >
                            {imagesPerClipOptions.map(imagesPerClipOption => (
                                <MenuItem key={imagesPerClipOption} value={imagesPerClipOption}>
                                    {imagesPerClipOption}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>image(s) per clip</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="imageExtensionLabel">
                            of
                        </InputLabel>
                        <Select
                            labelId="imageExtensionLabel"
                            id="imageExtension"
                            name="imageExtension"
                            className={classes.select}
                            value={values.imageExtension}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'jpg'}>jpg</MenuItem>
                        </Select>
                        <FormHelperText>type.</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="totalClipsLabel">
                            Divide video into
                        </InputLabel>
                        <Select
                            labelId="totalClipsLabel"
                            id="totalClips"
                            name="totalClips"
                            className={classes.select}
                            value={values.totalClips}
                            onChange={handleSelectChange}
                        >
                            {totalClipsOptions.map(totalClipsOption => (
                                <MenuItem key={totalClipsOption} value={totalClipsOption}>
                                    {totalClipsOption}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>clips.</FormHelperText>
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
