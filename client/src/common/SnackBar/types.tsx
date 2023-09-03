export enum SnackType {
    SUCCESS,
    FAILURE,
    WARNING,
}

export interface Snack {
    id: number;
    message: string;
    type: SnackType;
}
