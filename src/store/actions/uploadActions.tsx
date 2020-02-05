import { Dispatch } from 'redux';
import browserHistory from '../../browserHistory';
import { UploadActionParams, UploadState } from '../commons/uploadCommons';
import { getPredictionsRequest } from './predictionsActions';

export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';
export const UPLOAD_VIDEO_ERROR = 'UPLOAD_VIDEO_ERROR';

// just for logging
export const uploadVideoRequest = (): UploadActionParams => ({ type: 'UPLOAD_VIDEO_REQUEST' });
export const uploadVideoSuccess = (): UploadActionParams => ({ type: UPLOAD_VIDEO_SUCCESS });
export const uploadVideoError = (): UploadActionParams => ({ type: UPLOAD_VIDEO_ERROR });

export const generateHighlights = (uploadData: UploadState, dispatch: Dispatch<UploadActionParams>): void => {
    dispatch(uploadVideoRequest());
    const url = '/apis/highlights/generate';
    const method = 'POST';

    const { video, timeFrame, sceneImages } = uploadData;
    const data = new FormData();
    data.append('time-frame', (timeFrame || 0).toString());
    data.append('scene-images', (sceneImages || 0).toString());
    data.append('video', video);
    fetch(url, {
        method: method,
        body: data,
        headers: {
            Accept: 'application/json',
        },
    })
        .then(res => res.json())
        .then(res => {
            dispatch(getPredictionsRequest(res));
            browserHistory.push('/highlights');
            dispatch(uploadVideoSuccess());
        })
        .catch(() => dispatch(uploadVideoError()));
};
