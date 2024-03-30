import bcrypt from "bcrypt";

export const comparePasswords = async (password, hashedPassword) => {
  try {
    const isValidPassword = await bcrypt.compare(
      password.toString(),
      hashedPassword.toString()
    );
    return isValidPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export const hashPasswordBcrypt = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export const capitalizeFirstLetters = (text) => {
  return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}