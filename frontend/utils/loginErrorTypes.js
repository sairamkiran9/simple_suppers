export const loginErrorTypes = (error) => {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Email or password is incorrect";

    case "auth/invalid-email":
      return "Invalid email format";

    case "auth/email-already-in-use":
      return "This email is already in use";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    case "auth/network-request-failed":
      return "Network error. Please try again.";

    default:
      return "Something went wrong. Please try again.";
  }
};
