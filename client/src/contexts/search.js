import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

const initialState = {
  address: "",
  type: "buy",
  category: ["100", "101", "102", "103"],
  priceRange: [0, 1000000000],
  priceRangeLabel: ["$0", "Any Price"],
  minBedrooms: "any",
  minBathrooms: "any",
  listingStatus: ["Available", "Sold"],
  minParkings: "any",
  propertySizeRange: [0, 50000],
  lotSizeRange: [0, 800000],
  lotSizeUnit: "perches",
  results: [],
  page: "",
  pageNo: 1,
  totalPages: 1,
  totalAds: 0,
  limit: 16,
  loading: false,
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(initialState);

  return (
    <SearchContext.Provider value={{ search, setSearch, initialState }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
