export class Validator {
  public emptyString(string: string) {
    if (typeof string != "string") return true;

    if (string.length > 0) return false;

    return true;
  }

  public validateDate(
    dateString: string,
    minDate: Date = new Date("1925-30-03"),
    maxDate: Date = new Date(),
  ) {
    if (!dateString) return false;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;

    if (min && date < min) return false;
    if (max && date > max) return false;

    return true;
  }

  public validateEmail(email: string) {
    if (!email || typeof email !== "string") return false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  public validateImagUpload(file: File) {
    if (!file) return false;

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    return validImageTypes.includes(file.type);
  }

  public validateUsername(username: string) {
    if (!username) return false;

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  }

  public validateMinLength(password: string): boolean {
    return password.length >= 8;
  }

  public validatePasswordMinLength(password: string) {
    return this.validateMinLength(password);
  }

  public validateHasSpecialCharacter(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  public validateHasNumber(password: string): boolean {
    return /\d/.test(password);
  }

  public validateHasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  public validateHasLowercase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  public validatePassword(password: string): boolean {
    return (
      this.validatePasswordMinLength(password) &&
      this.validateHasSpecialCharacter(password) &&
      this.validateHasNumber(password) &&
      this.validateHasUppercase(password) &&
      this.validateHasLowercase(password)
    );
  }
}
