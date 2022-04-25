class HttpError {
  message = "";
  status = "";
  constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }
}

export default HttpError;
