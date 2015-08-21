var Constants = require("./constants");

var Messages = {
  AllParametersMissing: "Come on! You can't just leave 'em blank!",
  UserNotFound: "Terribly sorry but we couldn't find you",
  UserExists: "You already signed up!",
  WrongPassword: "Wrong passwords don't fly around here",
  InvalidEmail: "You need to use an actual email address",
  PasswordTooShort: "Your password needs to be longer than " + Constants.MIN_PASSWORD_LENGTH +  " characters",
  PasswordTooLong: "Your password can't be longer than " + Constants.MAX_PASSWORD_LENGTH + " characters",
  PasswordsDontMatch: "New and confirm passwords don't match",
  BlankData: "Your data is blank bro",
  EmailReminderSent: "Email reminder sent",
  ResetPasswordCheckEmail: "Check your email to reset your password :)",
  ResetPassword: "Your password was reset"
};

module.exports = Messages;
