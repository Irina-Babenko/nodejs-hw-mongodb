// const parseContactType = (type) => {
//   const isString = typeof type === 'string';
//   if (!isString) return;
//   const isType = (type) => ['work', 'home', 'personal'].includes(type);

//   if (isType(type)) return type;
// };

// const parseIsFavorite = (boolean) => {
//   const isString = typeof boolean === 'string';
//   if (!isString) return;

//   const isFavourite = boolean.toLocaleLowerCase();

//   return isFavourite;
// };

// export const parseContactsFilterParams = (query) => {
//   const { contactType, isFavourite } = query;

//   const parsedType = parseContactType(contactType);
//   const parsedIsFavourite = parseIsFavorite(isFavourite);

//   return {
//     type: parsedType,
//     isFavourite: parsedIsFavourite,
//   };
// };
