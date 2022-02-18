function ucFirst(str) {
  if (!str) {
    return str;
  } else {
    const valueToSplit = str.split('');
    const firstLetter = valueToSplit[0].toUpperCase();

    valueToSplit.splice(0, 1);

    const result = [firstLetter, ...valueToSplit].join('');

    return result;
  }
}
