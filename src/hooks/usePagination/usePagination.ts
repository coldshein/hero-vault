import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (pageFromParams !== currentPage) {
      setCurrentPage(pageFromParams);
    }
  }, [location.search]);

  const setCurrentPage = (page: number) => {
    if (page > 1) {
      searchParams.set("page", page.toString());
    } else {
      searchParams.delete("page");
    }
    setSearchParams(searchParams, { replace: true });
  };

  return [currentPage, setCurrentPage] as const;
};
