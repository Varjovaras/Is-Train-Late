export const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateForUrl = (date: string) => {
  const [year, month, day] = date.split("-");
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
};
