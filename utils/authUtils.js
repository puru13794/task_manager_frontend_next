import Cookies from "js-cookie";

// const TOKEN_COOKIE_NAME = 'auth_token';
const COOKIE_TIMEOUT_IN_MINUTES = 60;

export const setAuthToken = (token, cookie_name) => {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + COOKIE_TIMEOUT_IN_MINUTES * 60 * 1000
  );

  Cookies.set(cookie_name, token, {
    expires: expirationDate,
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = (cookie_name) => {
//   console.log(
//     Cookies.get(cookie_name),
//   );
  return Cookies.get(cookie_name);
};

export const removeAuthToken = (cookie_name) => {
  Cookies.remove(cookie_name, { secure: true, sameSite: "strict" });
};
