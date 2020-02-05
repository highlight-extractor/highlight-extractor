import { GET_PREDICTIONS_REQUEST } from '../actions/predictionsActions';
import { PredictionsActionParams, HighlightsState } from '../commons/highlightCommons';

const initialState = {
    predictions: [],
};

export default (state = initialState, action: PredictionsActionParams): HighlightsState => {
    if (action.type === GET_PREDICTIONS_REQUEST) {
        return Object.assign({}, state, {
            predictions: action.response,
        });
    }
    return Object.assign({}, state, {});
};
