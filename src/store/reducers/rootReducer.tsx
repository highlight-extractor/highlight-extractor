import { combineReducers } from 'redux';
import { HighlightsState } from '../commons/highlightCommons';
import { UploadState } from '../commons/uploadCommons';
import predictionsReducer from './predictionsReducer';
import uploadReducer from './uploadReducer';

export interface AppState {
    upload: UploadState;
    highlights: HighlightsState;
}

const rootReducer = combineReducers({
    upload: uploadReducer,
    highlights: predictionsReducer,
});

export default rootReducer;
