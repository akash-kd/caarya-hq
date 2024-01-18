export const randomColor = (randomNo) => {
  return `#${Math.floor(randomNo * 16777215).toString(16)}`;
};
