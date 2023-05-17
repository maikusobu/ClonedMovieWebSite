import { deleteCookie, getCookie } from "../../Helper/CookieFunction";
export const deleteSession = async () => {
  const session_id = getCookie("session_id");
  if (typeof session_id === "string" && session_id !== null) {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ session_id: session_id }),
    };
    fetch(
      `${import.meta.env.VITE_SITE_API_TMDB}/3/authentication/session`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        deleteCookie("session_id");
        alert("successfully deleted, you should reload the page");
      })
      .catch((err) => console.error(err));
  }
};
