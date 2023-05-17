export const isBeginWithHTTPS = (url: string) => {
  if (url?.startsWith("/https")) {
    return true;
  } else return false;
};
