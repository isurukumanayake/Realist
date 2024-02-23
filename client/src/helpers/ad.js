// This function formats a number by converting it to a string and inserting commas as thousands separators
export function formatNumber(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
