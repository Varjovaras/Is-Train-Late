export const isSuitableId = (id: string) => {
  const url = id.split("-");
  if (url.length !== 4) {
    throw new Error("Wrong url");
  }
  const trainNumber = url[0];
  const year = url[1];
  const month = url[2];
  const day = url[3];
  if (!Number.isInteger(Number(trainNumber))) {
    throw new Error(`Train number ${trainNumber} is not integer`);
  }
  if (!Number.isInteger(Number(year))) {
    throw new Error(`Year ${year} is not integer`);
  }
  if (year.length !== 4) {
    throw new Error(`Year ${year} is not suitable length`);
  }
  if (!Number.isInteger(Number(month))) {
    throw new Error(`Month ${month} is not integer`);
  }
  if (month.length > 2) {
    throw new Error(`Month ${month} is not suitable length`);
  }
  if (!Number.isInteger(Number(day))) {
    throw new Error(`Day ${day} is not integer`);
  }
  if (day.length > 2) {
    throw new Error(`Day ${day} is not suitable length`);
  }
  return true;
};
