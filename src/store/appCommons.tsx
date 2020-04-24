import { Action } from 'redux';

export interface VideoHighlight {
    imageUrl: string;
    meanScorePrediction: number;
    timestamp: number;
}
export interface HighlightProps {
    key: number;
    width: number;
    highlight: VideoHighlight;
}
export interface HighlightsState {
    predictions: VideoHighlight[];
    timeTaken: number;
}

export interface ProgressState {
    inProgress: boolean;
}

export interface ToastState {
    type: 'error' | 'info' | 'success';
    message: string;
}

export interface UploadState {
    video: File;
    totalClips: number;
    imagesPerClip: number;
    mode: string;
    imageExtension: string;
}
export interface UploadDispatchProps {
    generateHighlights: (uploadData: UploadState) => void;
}

export interface ActionParams<T = HighlightsState | ProgressState | ToastState | UploadState> extends Action<string> {
    response: T;
}

export interface AppState {
    progress: ProgressState;
    upload: UploadState;
    highlights: HighlightsState;
    toast: ToastState;
}
