export class RequirementError {
  message: string;

  constructor(field: string) {
    if (field) {
      this.message = `${field} is required field`;
    }
  }
}
