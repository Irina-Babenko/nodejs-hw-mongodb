const sortOrderList = ['asc', 'desc'];

export const parsSortParams = ({ sortBy, sortOrder }, sortByList) => {
  const parsedSortOder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOder,
  };
};
