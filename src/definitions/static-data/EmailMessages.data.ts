import { EmailMessageClass } from '../classes';

export class EmailMessagesData {
  static otpMessage(code: number): EmailMessageClass {
    return new EmailMessageClass('Verification code', `<H2>Dont say this code</H2>   <p>${code}</p>`);
  }
}
