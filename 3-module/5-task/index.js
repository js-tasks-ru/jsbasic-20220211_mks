function getMinMax(str) {
  let arr = str.split(' ');

  let tempArr = arr
    .map(item => item / 1)
    .filter(item => item);

  let obj = {};

  obj.min = Math.min(...tempArr);
  obj.max = Math.max(...tempArr);

  return obj;
}
