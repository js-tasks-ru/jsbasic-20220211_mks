function factorial(n) {
  let value = 1;

  if (n == 0 || n == 1) {
    return value;
  } else {
    for (let i = n; i >= 1; i -= 1) {
      value = value * i;
    }
    return value;
  }

}
