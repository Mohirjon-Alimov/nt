export class EmailMessageClass {
  /** Тема писма */
  subject?: string;

  /** Текст писма */
  text?: string;

  constructor(subject: string, text: string) {
    this.subject = subject;
    this.text = text;
  }
}
