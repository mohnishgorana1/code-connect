export function formatToDDMMYYYY(ISODate: any) {
  const dateObject = new Date(ISODate);
  return dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
