import CustomError from './CustomError';

export default class BusinessError extends CustomError {
    constructor(message: string) {
        super(0, 'BusinessError', message);
    }
}
