function hideSelf() {
  const selfButton = document.querySelector('.hide-self-button');

  selfButton.onclick = () => {
    selfButton.setAttribute('hidden', '');
  }
}
