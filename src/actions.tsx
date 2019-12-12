export interface Prediction {
    image_id: string,
    mean_score_prediction: number
}

export const UPLOAD_VIDEO_REQUEST = 'UPLOAD_VIDEO_REQUEST';
const uploadVideoRequest = () => ({type: UPLOAD_VIDEO_REQUEST});

export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';
const uploadVideoSuccess = (predictions: any) => ({
    type: UPLOAD_VIDEO_SUCCESS,
    predictions
});

export const UPLOAD_VIDEO_ERROR = 'UPLOAD_VIDEO_ERROR';
const uploadVideoError = (error: any) => ({
    type: UPLOAD_VIDEO_ERROR,
    error
});

export const uploadVideo = (file: File) => (dispatch: any) => {
    dispatch(uploadVideoRequest());

    const url = 'http://localhost:3000/generate';
    const method = 'POST';

    return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('file', file);
        fetch(url, {
            method: method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((res) => {
            dispatch(uploadVideoSuccess(res));
            return resolve(res);
        }).catch((err) => {
            dispatch(uploadVideoError(err));
            return reject(err);
        });
    });
};