function truncate(str, maxlength) {
  if (str.length >= maxlength) {
    str = str.substr(0, maxlength - 1);
    str = str + ('…');

    return str;
  } else {

    return str;
  }
}
