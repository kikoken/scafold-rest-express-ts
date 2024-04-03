export interface Error {
    message: string;
    code?: number;
}

export type InvalidArgumentError = Error