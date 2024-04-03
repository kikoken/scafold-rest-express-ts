export interface ErrorType extends Error {
    code?: number;
}

export type InvalidArgumentError = ErrorType