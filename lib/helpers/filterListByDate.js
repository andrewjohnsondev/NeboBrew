function filterListByDate(data) {
  const list = [...data];
  return list.sort((x, y) => {
    return parseInt(y.stripeDate) - parseInt(x.stripeDate);
  });

  return list;
}
export default filterListByDate;
