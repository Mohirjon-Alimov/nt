export class InvalidVerificationCodeError {
  message: string;

  constructor() {
    this.message = 'Invalid verification code';
  }
}
