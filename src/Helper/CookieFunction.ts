type optionsType = {
  user?: string;
  path?: string;
  expires?: Date | string;
  secure?: boolean;
  domain?: string;
  "max-age"?: number;
  [key: string | "max-age"]: string | boolean | undefined | Date | number;
};
export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name: string, value: string, options: optionsType) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
