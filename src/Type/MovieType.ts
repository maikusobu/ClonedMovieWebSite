import {
  productionCompanies,
  genreType,
} from "../components/MovieDetail/MovieData/MovieData";
export interface MovieType {
  id: number;
  name: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  character: string;
  homepage: string;
  production_companies: productionCompanies[];
  genres: genreType[] & MovieType;
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
}
