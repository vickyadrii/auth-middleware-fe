import Cookie from "js-cookie";

const cookieKey = "bearer-token";

export const setAccessToken = (token: string) => {
  Cookie.set(cookieKey, token, {
    expires: 1,
  });
};

export const getAccessToken = () => {
  const token = Cookie.get(cookieKey);
  return token ?? null;
};

export const removeAccessToken = () => {
  Cookie.remove(cookieKey);
};
