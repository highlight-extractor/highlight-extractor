import { UPLOAD_VIDEO_ERROR, UPLOAD_VIDEO_SUCCESS } from '../actions/uploadActions';
import { UploadActionParams, UploadState } from '../commons/uploadCommons';

const initialState = {};

export default (state = initialState, action: UploadActionParams): {} | UploadState => {
    switch (action.type) {
        case UPLOAD_VIDEO_SUCCESS:
            return Object.assign({}, state, {});
        case UPLOAD_VIDEO_ERROR:
            return Object.assign({}, state, {});
        default:
            return Object.assign({}, state, {});
    }
};
