import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';
import { UploadFormState } from '../commons/uploadCommons';

export interface AppState {
    upload: UploadFormState;
}

const rootReducer = combineReducers({
    upload: uploadReducer,
});

export default rootReducer;
