export const api_key = "d438f2f8ef299fb8e091eed12ef4c422";
export const urlImage = "https://image.tmdb.org/t/p/original";
function getApiUrl(path) {
  return `https://api.themoviedb.org/3${path}`;
}

export function getHomeList() {
  return [
    {
      slug: "originals",
      title: "Originais do Netflix",
      items: [],
    },
    {
      slug: "trending",
      title: "Recomendados para vocë",
      items: [],
    },
    {
      slug: "toprated",
      title: "Em alta",
      items: [],
    },
    {
      slug: "action",
      title: "Ação",
      items: [],
    },
    {
      slug: "comedy",
      title: "Comédia",
      items: [],
    },
    {
      slug: "horror",
      title: "Terror",
      items: [],
    },
    {
      slug: "romance",
      title: "Romance",
      items: [],
    },
    {
      slug: "documentary",
      title: "Documentários",
      items: [],
    },
  ];
}
// build a function convert decimal into binary and return it
export function convertDecimalToBinary(decimal) {
  return decimal.toString(2);
}
