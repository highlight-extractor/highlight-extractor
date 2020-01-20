import 'react-dropzone-uploader/dist/styles.css';
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import UploadForm from './UploadForm';
import { UploadActionParams, UploadFormInputState, UploadFormState } from '../store/commons/uploadCommons';
import {
    updateFormInputRequest,
    uploadVideoError,
    uploadVideoRequest,
    uploadVideoSuccess,
} from '../store/actions/uploadActions';
import { AppState } from '../store/reducers/rootReducer';

interface UploadState extends UploadFormState {
    redirectToReferrer: boolean;
    predictions: any;
}

interface UploadDispatchProps {
    updateFormInput: (inputChange: Partial<UploadFormState>) => void;
    uploadVideo: (uploadData: UploadFormState) => void;
}

type UploadProps = UploadState & UploadDispatchProps;

const updateFormInput = (inputChange: Partial<UploadFormState>) => (dispatch: Dispatch<UploadActionParams>): void => {
    dispatch(updateFormInputRequest({ inputChange }));
};

const uploadVideo = (uploadData: UploadFormState) => (dispatch: Dispatch<UploadActionParams>): void => {
    dispatch(uploadVideoRequest());

    const url = `${process.env.REACT_APP_API_ENDPOINT}/generate`;
    const method = 'POST';

    // return new Promise((resolve, reject) => {
    const { video, timeFrame, samplingRate, sceneImages, summaryImages } = uploadData;
    if (video === null) {
        const err = { error: 'Null video' };
        dispatch(uploadVideoError(err));
        // return reject(err);
    } else {
        const data = new FormData();
        data.append('time-frame', (timeFrame || 0).toString());
        data.append('sampling-rate', (samplingRate || 0).toString());
        data.append('scene-images', (sceneImages || 0).toString());
        data.append('summary-images', (summaryImages || 0).toString());
        data.append('video', video);
        // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
        fetch(url, {
            method: method,
            body: data,
            headers: {
                Accept: 'application/json',
            },
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                dispatch(uploadVideoSuccess(res));
                // return resolve(res);
            })
            .catch(err => {
                dispatch(uploadVideoError(err));
                // return reject(err);
            });
        // });
    }
};

class Upload extends Component<UploadProps> {
    constructor(props: UploadProps) {
        super(props);
    }

    // called every time a file's `status` changes
    handleFileChange = (files: [File]): void => {
        // TODO fix the error thrown when the file size is large
        if (files.length === 1) {
            this.props.updateFormInput({ video: files[0] });
        } else {
            this.props.updateFormInput({ video: null });
        }
    };

    // ref: https://stackoverflow.com/questions/54493511/form-in-react-and-typescript-with-dry-handle-of-change
    handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        this.props.updateFormInput({ [name]: Number(value) });
    };

    handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // console.log('submit clicked');
        const { video, timeFrame, samplingRate, sceneImages, summaryImages } = this.props;
        const uploadData = {
            video,
            timeFrame,
            samplingRate,
            sceneImages,
            summaryImages,
        };
        // console.log(uploadData);

        // this.setState({
        //     redirectToReferrer: true,
        // });

        this.props.uploadVideo(uploadData);
    };

    render(): React.ReactNode {
        // const redirectToReferrer = this.state.redirectToReferrer;
        // if (redirectToReferrer) {
        //     return <Redirect to="/highlights" />;
        // }

        // console.log('render');
        const { video, timeFrame, samplingRate, sceneImages, summaryImages } = this.props;
        const uploadFormProps = {
            video,
            timeFrame,
            samplingRate,
            sceneImages,
            summaryImages,
            onFileChange: this.handleFileChange,
            onInputChange: this.handleInputChange,
            onSubmit: this.handleSubmit,
        };
        // console.log(uploadData);

        return (
            <Container component="main" maxWidth="xs">
                <UploadForm {...uploadFormProps} />
            </Container>
        );
    }
}

const mapStateToProps = ({ upload }: AppState): UploadFormState => ({ ...upload });

// TODO Remove the any types
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateFormInput: (inputChange: Partial<UploadFormState>): void => dispatch(updateFormInput(inputChange)),
    uploadVideo: (uploadData: UploadFormState): void => dispatch(uploadVideo(uploadData)),
});

// ref: https://github.com/microsoft/TypeScript/issues/25103
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
