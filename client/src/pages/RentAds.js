import React, { useEffect } from "react";
import CommonLayout from "../layouts/CommonLayout";
import Search from "./Search";
import { useSearch } from "../contexts/search";

const RentAds = () => {
  const { search, setSearch } = useSearch();

  useEffect(() => {
    setSearch({
      ...search,
      type: "rent",
      category: ["100", "101", "102", "103", "104", "105"],
      priceRange: [0, 1000000],
      priceRangeLabel: ["$0", "Any Price"],
      pageNo: 1,
    });
  }, []);

  return (
    <CommonLayout>
      <Search />
    </CommonLayout>
  );
};

export default RentAds;
