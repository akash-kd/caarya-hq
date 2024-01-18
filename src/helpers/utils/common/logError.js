export const logError = (name, err) => {
  console.log(name + " error: ", err);
  console.log(name + " error (BE): ", err?.response?.data);
};
