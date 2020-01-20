import { UploadActionParams, UploadActionPayload } from '../commons/uploadCommons';

export const UPDATE_FORM_INPUT_REQUEST = 'UPDATE_FORM_INPUT_REQUEST';
export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';

const UPLOAD_VIDEO_ERROR = 'UPLOAD_VIDEO_ERROR';

export const updateFormInputRequest = ({ inputChange }: UploadActionPayload): UploadActionParams => ({
    type: UPDATE_FORM_INPUT_REQUEST,
    inputChange,
});

// just for logging
export const uploadVideoRequest = (): UploadActionParams => ({ type: 'UPLOAD_VIDEO_REQUEST' });

export const uploadVideoSuccess = (predictions: UploadActionPayload): UploadActionParams => ({
    type: UPLOAD_VIDEO_SUCCESS,
    predictions,
});

export const uploadVideoError = (error: UploadActionPayload): UploadActionParams => ({
    type: UPLOAD_VIDEO_ERROR,
    error,
});
