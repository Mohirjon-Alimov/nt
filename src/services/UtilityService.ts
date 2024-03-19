export class UtilityService {
  static generateOtp(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on length
    const max = Math.pow(10, length) - 1; // Maximum value based on length
    return Number(Math.floor(min + Math.random() * (max - min + 1))); // Generate OTP within range
  }

  static generate20DigitNumber(): number {
    let result = 0;
    for (let i = 0; i < 20; i++) {
      result = result * 10 + Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
    }
    return result;
  }

  static generate16DigitNumber(): number {
    return Math.floor(Math.random() * 1E16)
  }
}
