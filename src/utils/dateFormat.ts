const dateFormat = new Intl.DateTimeFormat("ID-id", {
  dateStyle: "medium",
  day: "numeric",
  month: "long",
  year: "numeric",
});
export const dateFormarter = (date: string | number): string => {
  const formatDate = new Date(date);
  return dateFormat.format(formatDate);
};
