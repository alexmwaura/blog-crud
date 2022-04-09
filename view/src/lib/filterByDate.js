export default function filterByDate(array) {
  return array.sort(function (a, b) {
    var dateA = new Date(a.updatedAt),
      dateB = new Date(b.updatedAt);
    return dateA - dateB;
  });
}
