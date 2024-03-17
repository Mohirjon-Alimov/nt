export class NotFoundError {
  message: string;

  constructor(target: string) {
    if (target) {
      this.message = `${target} not found.`;
    }
  }
}