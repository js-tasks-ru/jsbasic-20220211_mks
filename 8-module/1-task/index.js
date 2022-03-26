import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const cart = document.querySelector('.cart-icon');
    
    if (cart.offsetWidth > 0) {
      const elemCoords = cart.getBoundingClientRect();
      const container = document.querySelector('.container');
      let leftIndent = Math.min(
        container.getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - cart.offsetWidth - 10
      );

      console.log(container.clientWidth);
      console.log(document.body.clientWidth);

      let initialTopCoord = cart.getBoundingClientRect().top + window.pageYOffset;

      if (elemCoords.top < initialTopCoord ) {
        cart.style.position = 'fixed';
        cart.style.top = '50px';
        cart.style.zIndex = '1000';
        cart.style.right = '10px';
        cart.style.left = `${leftIndent}px`;
      }

      if (elemCoords.top == initialTopCoord) {
        cart.style.position = '';
        cart.style.top = '';
        cart.style.zIndex = '';
        cart.style.right = '10px';
        cart.style.left = '';
      }

      if (document.documentElement.clientWidth <= 767) {
        cart.style.position = '';
        cart.style.top = '';
        cart.style.zIndex = '';
        cart.style.left = '';
      }
        
    }
  }
}
