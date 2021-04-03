import CustomError from './CustomError';

export default class ValidationError extends CustomError {
    constructor(message: string) {
        super(20, 'ValidationError', message);
    }
}

