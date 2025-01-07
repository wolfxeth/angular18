export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  // Constructor to initialize the properties
  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // You can also add methods for additional logic if needed
  // For example, a method to check if the user has a valid email:
  // isValidEmail(): boolean {
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //   return emailRegex.test(this.email);
  // }

  // A method to reset the password (just an example)
  // resetPassword(newPassword: string): void {
  //   this.password = newPassword;
  // }

}
