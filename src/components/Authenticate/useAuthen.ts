import { setCookie } from "../../Helper/CookieFunction";
export type session_id = {
  success: boolean;
  session_id: string;
  status_message?: string;
};

async function Authen() {
  let dataSession: Awaited<Promise<session_id | string>>;
  dataSession = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  };
  const token = await fetch(
    `${import.meta.env.VITE_SITE_API_TMDB}/3/authentication/token/new`,
    options
  );

  const response_token = await token.json();
  const vnTime = new Date(response_token.expires_at);
  vnTime.setHours(vnTime.getHours() + 7);
  const timeExipre = new Date(vnTime);
  const timeExipreString = timeExipre.toUTCString();
  setCookie("expire", timeExipreString, {
    secure: true,
  });
  window.location.href = `${import.meta.env.VITE_SITE_TMDB}/authenticate/${
    response_token.request_token
  }?redirect_to=${import.meta.env.VITE_SITE}/login`;
}
async function AuthenGuest() {
  let dataSession: Awaited<Promise<session_id | string>>;
  dataSession = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  };
  const token = await fetch(
    `${import.meta.env.VITE_SITE_API_TMDB}/3/authentication/guest_session/new`,
    options
  );

  const response_token = await token.json();
  localStorage.setItem("expire", JSON.stringify(response_token.expires_at));
}
export { Authen, AuthenGuest };
