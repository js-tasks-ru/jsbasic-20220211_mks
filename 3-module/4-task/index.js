function showSalary(users, age) {
  const arr = [];

  for (user of users) {
    if (user.age <= age) {
      arr.push(`${user.name}, ${user.balance}`);
    }
  }

  return arr.join('\n');
}
