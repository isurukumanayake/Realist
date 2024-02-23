import React, { useEffect } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useSearch } from "../contexts/search";
import Search from "./Search";

const BuyAds = () => {
  const { search, setSearch } = useSearch();

  useEffect(() => {
    setSearch({
      ...search,
      type: "buy",
      category: ["100", "101", "102", "103"],
      priceRange: [0, 1000000000],
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

export default BuyAds;
