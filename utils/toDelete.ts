export const getUserOne = async () => {
  return await fetch(`http://dummyjson.com/users/${userId}`).then(response=>response.json());
};
