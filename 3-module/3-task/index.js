function camelize(str) {

  let arr = str.split('-');

  let firstItem = arr.shift(0, 1);

  arr.splice();

  let mapped = arr.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('');

  let value = firstItem + mapped;

  return value;
}