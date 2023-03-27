const apikey = "d438f2f8ef299fb8e091eed12ef4c422";

export const getTheMovie = async (name) => {
  if (name) {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${name}&page=1&include_adult=false`
      );
      const dataJSON = await data.json();
      console.log(dataJSON.results);

      // if (dataFiler.length() > 10) return [...dataFiler.slice(0, 10), "Xem Tiếp"];
      // else return dataFiler;
    } catch (e) {
      console.log(e);
    }
  }
};
