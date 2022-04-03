import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();

    this.cartItems = [];
    this.products = [];    
  }

  addProduct(product) {

    if (!product) {
      return
    }

    let tempProduct = {
      product: product,
      count: 1,
    }

    this.products.push(product);

    if (this.cartItems.length > 0) {
      if (this.cartItems.some(item => JSON.stringify(product) == JSON.stringify(item.product))) {
        for (let item in this.cartItems) {
          if (JSON.stringify(product) == JSON.stringify(this.cartItems[item].product)) {
            this.cartItems[item].count = this.cartItems[item].count + 1;
          }
        }
      }
      else {
        this.cartItems.push(tempProduct);
      }
    }

    if (this.cartItems.length == 0) {
      this.cartItems.push(tempProduct);
    }

    for (let cartItem of this.cartItems) {
      this.onProductUpdate(cartItem);
    }
 
  }

  updateProductCount(productId, amount) {

    console.log(this.cartItems);

    this.cartItems = this.cartItems.map(updateCountsCartItems);

    function updateCountsCartItems(tempItem) {

      if (tempItem.product.id == productId) {
        tempItem.count = tempItem.count + amount;
      }

      console.log(tempItem);

      return tempItem;
    }
    
    console.log(this.cartItems);

    for (let item in this.cartItems) {
      console.log(this.cartItems[item].product);

      console.log(this.cartItems[item].count);

      if (this.cartItems[item].count == 0) {
        console.log('updateProductCount 0');
        this.onProductUpdate(this.cartItems);
        this.cartItems.splice(this.cartItems.indexOf(this.cartItems[item]), 1);
      }

    }

    this.onProductUpdate(this.cartItems);
    console.log(this.cartItems);
    console.log(this.cartItems.length);
    console.log(this.isEmpty());

    if (this.isEmpty()) {
      document.body.classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    }
    
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false
    } else {
      return true
    }
    
  }

  getTotalCount() {
    let totalCount = 0;
    
    for (let item in this.cartItems) {
      totalCount = this.cartItems[item].count + totalCount;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item in this.cartItems) {
      totalPrice = this.cartItems[item].product.price * this.cartItems[item].count + totalPrice;
    }
    
    return totalPrice;
  }

  renderProduct(product, count) {
    console.log(product)
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();
    const modalBody = document.createElement('div');
    modal.setTitle('Your order');
    
    console.log(this.cartItems);
    console.log(this.products);

    for (let item of this.cartItems) {
      const cartProduct = this.renderProduct(item.product, item.count)
      
      console.log(cartProduct);

      cartProduct.querySelector('.cart-counter__button_minus').addEventListener('click', () => {
        console.log('event-minus')
        const currentCartProduct = cartProduct.dataset.productId;
        this.updateProductCount(currentCartProduct, -1);
        console.log(this.cartItems);
        // cartProduct.querySelector('.cart-counter__count').innerText = Number(cartProduct.querySelector('.cart-counter__count').innerText) - 1;
      });
      cartProduct.querySelector('.cart-counter__button_plus').addEventListener('click', () => {
        console.log('event-plus')
        const currentCartProduct = cartProduct.dataset.productId;
        this.updateProductCount(currentCartProduct, 1);
        console.log(this.cartItems);
        // cartProduct.querySelector('.cart-counter__count').innerText = Number(cartProduct.querySelector('.cart-counter__count').innerText) + 1;
      });

      modalBody.append(cartProduct);
    }

    modalBody.append(this.renderOrderForm());
    modal.setBody(modalBody);

    modal.open();

    this.onSubmit();

  }

  onProductUpdate(cartItem) {
    console.log(cartItem);
    this.cartIcon.update(this);

    if (document.body.classList == 'is-modal-open') {
      let modalBody = document.querySelector('.modal');
      let generalPrice = 0;

      for (let item in cartItem) {
        let productId = cartItem[item].product.id;

        // Элемент, который хранит количество товаров с таким productId в корзине
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
  
        // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        productPrice.innerHTML = `€${(cartItem[item].product.price * cartItem[item].count).toFixed(2)}`;

        // Элемент с суммарной стоимостью всех товаров
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        generalPrice = generalPrice + (cartItem[item].product.price * cartItem[item].count);
        infoPrice.innerHTML = `€${generalPrice.toFixed(2)}`;
      
        productCount.innerHTML = cartItem[item].count;

      if (cartItem[item].count ==  0) {
        let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
        product.remove();
        console.log(cartItem)
      }

      }  

    }
  }

  onSubmit(event) {
    if (document.body.classList == 'is-modal-open') {
      const form = document.querySelector('.cart-form');

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        form.querySelector('[type=submit]').classList.add('is-loading');
        
        const formData = new FormData(form);

        const responsePromise = fetch('https://httpbin.org/post', {
          body: formData,
          method: 'POST'
        });

        responsePromise
          .then((response) => {
            document.querySelector('.modal__title').innerHTML = 'Success!';
            this.cartItems.splice(0, this.cartItems.length);
            this.onProductUpdate(this.cartItems);
            document.querySelector('.modal__body').innerHTML = `
              <div class="modal__body-inner">
                <p>
                  Order successful! Your order is being cooked :) <br>
                  We’ll notify you about delivery time shortly.<br>
                  <img src="/assets/images/delivery.gif">
                </p>
              </div>
            `
          })
          .catch(() => {
            console.log('error');
          })       
        });

    }

    
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

