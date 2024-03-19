export const IsLogged = () => {
  let token = localStorage.getItem('token');
  return !!token;
};
