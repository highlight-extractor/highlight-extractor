import { UPDATE_FORM_INPUT_REQUEST, UPLOAD_VIDEO_SUCCESS } from '../actions/uploadActions';
import { UploadActionParams } from '../commons/uploadCommons';

const initialState = {
    video: null,
    timeFrame: null,
    samplingRate: null,
    sceneImages: null,
    summaryImages: null,
    predictions: [],
    redirectToReferrer: false,
};

export default (state = initialState, action: UploadActionParams) => {
    switch (action.type) {
        case UPDATE_FORM_INPUT_REQUEST:
            return Object.assign({}, state, { ...action.inputChange });
        case UPLOAD_VIDEO_SUCCESS:
            return Object.assign({}, state, { predictions: action.predictions });
        default:
            return Object.assign({}, state, {});
    }
};
