// TODO reduce the statements in this
import { combineReducers } from 'redux';
import { ActionParams, HighlightsState, ProgressState, ToastState, UploadState } from './appCommons';
import { GET_PREDICTIONS_REQUEST, PROGRESS_SHOW, TOAST_SHOW, UPLOAD_VIDEO_REQUEST } from './storeActions';

const predictionsInitialState: HighlightsState = {
    predictions: [],
    timeTaken: 0,
};
const predictionsReducer = (state = predictionsInitialState, action: ActionParams): HighlightsState => {
    if (action.type === GET_PREDICTIONS_REQUEST) {
        return Object.assign({}, state, { ...action.response });
    }
    return Object.assign({}, state);
};

const progressInitialState: ProgressState = {
    inProgress: false,
};
const progressReducer = (state = progressInitialState, action: ActionParams): ProgressState => {
    if (action.type === PROGRESS_SHOW) {
        return Object.assign({}, state, { ...action.response });
    }
    return Object.assign({}, state);
};

const toastInitialState: ToastState = {
    type: 'info',
    message: '',
};
const toastReducer = (state = toastInitialState, action: ActionParams): ToastState => {
    if (action.type === TOAST_SHOW) {
        return Object.assign({}, state, { ...action.response });
    }
    return Object.assign({}, state);
};

const uploadReducer = (state = {}, action: ActionParams): UploadState | {} => {
    if (action.type === UPLOAD_VIDEO_REQUEST) {
        return Object.assign({}, state, { ...action.response });
    }
    return Object.assign({}, state);
};

const rootReducer = combineReducers({
    highlights: predictionsReducer,
    progress: progressReducer,
    toast: toastReducer,
    upload: uploadReducer,
});

export default rootReducer;
