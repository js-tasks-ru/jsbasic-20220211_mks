function namify(users) {
  let userNames = [];

  for (user of users){
    userNames.push(user.name);
  }

  return userNames;
}
