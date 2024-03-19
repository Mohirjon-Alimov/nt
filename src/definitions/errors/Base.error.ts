export class BaseError {
  message: string;

  constructor(message: string) {
    if (message) {
      this.message = message;
    }
  }
}