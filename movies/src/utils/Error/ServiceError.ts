import CustomError from './CustomError';

export default class ServiceError extends CustomError {
    constructor(message: string) {
        super(10, 'ServiceError', message);
    }
}
