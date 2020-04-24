import { Dispatch } from 'redux';
import browserHistory from '../browserHistory';
import { ActionParams, HighlightsState, ProgressState, ToastState, UploadState } from './appCommons';

export const PROGRESS_SHOW = 'PROGRESS_SHOW';
export const progressShow = (response: ProgressState): ActionParams => ({
    type: PROGRESS_SHOW,
    response: response,
});

export const UPLOAD_VIDEO_REQUEST = 'UPLOAD_VIDEO_REQUEST';
export const uploadVideoRequest = (response: UploadState): ActionParams => ({
    type: UPLOAD_VIDEO_REQUEST,
    response,
});

export const GET_PREDICTIONS_REQUEST = 'GET_PREDICTIONS_REQUEST';
export const getPredictionsRequest = (predictions: HighlightsState): ActionParams => ({
    type: GET_PREDICTIONS_REQUEST,
    response: predictions,
});

export const TOAST_SHOW = 'TOAST_SHOW';
export const toastShow = (response: ToastState): ActionParams => ({
    type: TOAST_SHOW,
    response,
});

export const callGenerateHighlights = (uploadData: UploadState, dispatch: Dispatch<ActionParams>): void => {
    dispatch(toastShow({ type: 'info', message: '' }));
    dispatch(progressShow({ inProgress: true }));
    dispatch(uploadVideoRequest(uploadData));
    const url = '/apis/highlights/generate';
    const method = 'POST';

    const { video, totalClips, imagesPerClip, mode, imageExtension } = uploadData;
    const data = new FormData();
    data.append('total_clips', totalClips.toString());
    data.append('images_per_clip', imagesPerClip.toString());
    data.append('mode', mode);
    data.append('image_extension', imageExtension);
    data.append('video', video);
    fetch(url, {
        method: method,
        body: data,
        headers: {
            Accept: 'application/json',
        },
    })
        .then(res => {
            if (!res.ok) {
                throw Error(res.status === 504 ? 'Server Down' : res.statusText);
            }
            return res.json();
        })
        .then(res => {
            dispatch(getPredictionsRequest(res));
            dispatch(toastShow({ type: 'success', message: 'Rendering Highlights' }));
            dispatch(progressShow({ inProgress: false }));
            browserHistory.push('/highlights');
        })
        .catch(err => {
            dispatch(toastShow({ type: 'error', message: err.message }));
            dispatch(progressShow({ inProgress: false }));
        });
};
