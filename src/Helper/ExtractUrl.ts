export const extractUrl = (url: string) => {
  if (url?.startsWith("/https")) {
    return true;
  } else return false;
};
