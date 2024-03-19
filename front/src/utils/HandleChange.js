export const HandleChange = (state, setState, name, text) => {
  setState({
    ...state,
    [name]: text,
  });
};
