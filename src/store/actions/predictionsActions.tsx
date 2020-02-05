import { PredictionsActionParams, VideoHighlight } from '../commons/highlightCommons';

export const GET_PREDICTIONS_REQUEST = 'GET_PREDICTIONS_REQUEST';

export const getPredictionsRequest = (predictions: VideoHighlight[]): PredictionsActionParams => ({
    type: GET_PREDICTIONS_REQUEST,
    response: predictions,
});
