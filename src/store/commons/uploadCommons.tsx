import React from 'react';

export interface UploadFormInputState {
    timeFrame: number | null;
    samplingRate: number | null;
    sceneImages: number | null;
    summaryImages: number | null;
}

export interface UploadFormState extends UploadFormInputState {
    video: File | null;
}

export interface UploadFormParams {
    onFileChange: (files: [File]) => void;
    onInputChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export interface UploadActionPayload {
    inputChange?: Partial<UploadFormState>;
    predictions?: any;
    error?: any;
}

export interface UploadActionParams extends UploadActionPayload {
    type: string;
}

export interface Prediction {
    image_id: string;
    mean_score_prediction: number;
}
