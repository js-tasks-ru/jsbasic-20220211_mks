function sumSalary(salaries) {

  let result = 0;

  for (let key in salaries) {
    if (salaries[key] >= 0 &&
      salaries[key] != NaN &&
      salaries[key] != Infinity &&
      salaries[key] != -Infinity)
    {
      result += salaries[key];
    }
  }

  return result;
}
