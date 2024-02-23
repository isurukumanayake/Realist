import { useSearch } from "../contexts/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

const useCustomSearch = () => {
  const { search, setSearch } = useSearch();

  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const {
        results,
        page,
        priceRangeLabel,
        totalPages,
        totalAds,
        loading,
        ...rest
      } = search;
      const query = queryString.stringify(rest);
      // console.log(query);

      const { data } = await axios.get(`/search?${query} `);

      if (window.location.pathname === "/") {
        setSearch((prev) => ({
          ...prev,
          results: data?.ads,
          totalPages: data.totalPages,
          totalAds: data.total,
          loading: false,
        }));
        navigate(`/ads/${search?.type}`);
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data?.ads,
          totalPages: data.totalPages,
          totalAds: data.total,
          page: window.location.pathname,
          loading: false,
        }));
      }
    } catch (error) {
      console.log(error);
      setSearch({ ...search, loading: false });
    }
  };

  return { handleSearch };
};

export default useCustomSearch;
