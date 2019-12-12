import {UPLOAD_VIDEO_SUCCESS} from "./actions";

export const initialState = {
    predictions: [],
    redirectToReferrer: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case UPLOAD_VIDEO_SUCCESS:
            return Object.assign({}, state, {predictions: action.predictions});
        default:
            return Object.assign({}, state, {});
    }
};