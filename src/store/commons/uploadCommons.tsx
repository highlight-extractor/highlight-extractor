import { Action } from 'redux';

export interface UploadState {
    video: File;
    timeFrame: number;
    sceneImages: number;
}

export interface UploadDispatchProps {
    generateHighlights: (uploadData: UploadState) => void;
}

export type UploadActionParams = Action<string>;
