export function convertDatesToLocale(data) {
  return data.map((item) => {
    if (item.date) {
      return {
        ...item,
        date: new Date(item.date).toLocaleDateString(),
      };
    }
    return item;
  });
}
