import { getListGenre } from "../SliceApi/SliceApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ListMovie } from "../ListMovie/ListMovie";
import { BestMovie } from "../BestMovie/BestMovie";
import { useNavigate } from "react-router-dom";
export const CateogySelect = ({
  genre,
  genreId,
  handleChangeId,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <select
          value={genreId}
          onChange={(e) => {
            handleChangeId(e.target.value);
            const value = e.target.value;
            const page = 1;
            setCurrentPage(page);
            navigate(`/${page}`);
            dispatch(getListGenre({ id: value, page: page }));
          }}
        >
          <option value="default" selected>
            Thể loại
          </option>
          {genre.map((gen) => (
            <option value={gen.id} key={gen.id}>
              {gen.name}
            </option>
          ))}
        </select>
        <div>
          <input type="checkbox" name="adultContent"></input>
          <label for="adultContent">Nội dung 18 tuổi</label>
        </div>
      </div>
      <div className="flex">
        <ListMovie />
        <BestMovie />
      </div>
    </>
  );
};
