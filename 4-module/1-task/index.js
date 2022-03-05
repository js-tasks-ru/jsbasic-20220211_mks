function makeFriendsList(friends) {

  const ul = document.createElement('ul');

  for (friend of friends) {
    const li = document.createElement('li');

    li.textContent = friend.firstName + ' ' + friend.lastName;
    ul.append(li);
  }

  document.body.append(ul);

  return ul;
}
