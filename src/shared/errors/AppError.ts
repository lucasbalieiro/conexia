class AppError {
    public readonly message: string;

    public readonly httpStatusCode: number;

    constructor(message: string, httpStatusCode = 400) {
      this.message = message;
      this.httpStatusCode = httpStatusCode;
    }
}
export default AppError;
