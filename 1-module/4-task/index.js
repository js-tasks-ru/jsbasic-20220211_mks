function checkSpam(str) {
  value = str.toUpperCase();
  if (value.includes('XXX') || value.includes('1XBET')) {
    return true;
  } else {
    return false;
  }
}
