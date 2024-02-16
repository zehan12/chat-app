export const getRandomColor = () => {
  var max = 0xffffff;
  return "#" + Math.round(Math.random() * max).toString(16);
};
