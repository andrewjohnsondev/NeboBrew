function filterListByDate(data) {
  const list = [...data];
  return list.sort((x, y) => {
    return parseInt(y.stripeDate) - parseInt(x.stripeDate);
  });

  console.log(list);

  return list;
}
export default filterListByDate;
