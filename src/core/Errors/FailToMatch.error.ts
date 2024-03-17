export class FailToMatchError {
  message: string;

  constructor(field: string, message?: string) {
    this.message = `'${field}' is fail to match`;
  }
}
