export const getAdmin = () => JSON.parse(localStorage.getItem("admin"));

export const setAdmin = (admin) =>
  localStorage.setItem("admin", JSON.stringify(admin));

export const getRole = () => localStorage.getItem("role");

export const setRole = (role) =>
  localStorage.setItem("role", JSON.stringify(role));

export const getBreadCrumb = () =>
  JSON.parse(localStorage.getItem("breadCrumb"));

export const setBreadCrumb = (breadCrumb) =>
  localStorage.setItem("breadCrumb", JSON.stringify(breadCrumb));

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) =>
  localStorage.setItem("token", JSON.stringify(token));
