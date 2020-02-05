import { Action } from 'redux';

export interface VideoHighlight {
    imageUrl: string;
    meanScorePrediction: number;
    timestamp: number;
}

export interface HighlightsState {
    predictions: VideoHighlight[];
}

export interface PredictionsActionParams extends Action<string> {
    response: VideoHighlight[];
}

export interface HighlightProps {
    key: number;
    highlight: VideoHighlight;
}
