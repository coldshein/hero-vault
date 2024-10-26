import { useEffect } from "react";
import { HeroCard } from "./HeroCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllHeroes } from "../lib/slices/heroSlice";
import { Pagination } from "@mui/material";
import { usePagination } from "../hooks/usePagination/usePagination";
import { Loader } from "./Loader/Loader";

export const CardList = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, isError, totalPages } = useAppSelector(
    (state) => state.heroList.heroes
  );

  const [currentPage, setCurrentPage] = usePagination();

  useEffect(() => {
    dispatch(getAllHeroes({ page: currentPage, limit: 5 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (_: unknown, value: number) => {
    setCurrentPage(value);
  };


  return (
    <section className="pb-3 w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="grid grid-cols-[300px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8 justify-center">
            {isError ? (
              <p>Something went wrong...</p>
            ) : !items.length ? (
              <h3>
                There is no at least one SuperHero, but you can fix this by
                adding one by clicking 'Add The Hero' button
              </h3>
            ) : (
              items.map((hero) => (
                <li className="w-full" key={hero._id}>
                  <HeroCard
                    id={hero._id}
                    nickname={hero.nickname}
                    img={hero.images}
                  />
                </li>
              ))
            )}
          </ul>
          <div className="flex justify-center mt-6">
            <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              variant="outlined"
            />
          </div>
        </>
      )}
    </section>
  );
};
