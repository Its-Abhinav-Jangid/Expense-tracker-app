export default function filterByCategories({
  data,
  startDate,
  endDate = new Date(),
}) {
  startDate = new Date(startDate).toISOString().split("T")[0];
  endDate = new Date(endDate).toISOString().split("T")[0];

  const filteredData = data.filter(
    (d) =>
      new Date(d.created_at.split("T")[0]) >= new Date(startDate) &&
      new Date(d.created_at.split("T")[0]) <= new Date(endDate)
  );
  const result = {};
  filteredData.forEach((d) => {
    if (result[d.category]) {
      result[d.category] += d.amount;
    } else {
      result[d.category] = d.amount;
    }
  });
  return result;
}
