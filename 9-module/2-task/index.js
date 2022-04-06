import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5, 
      value: 3
    });
    this.cartIcon = new CartIcon();

    console.log(this.cartIcon)

    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    const carousel = document.querySelector('[data-carousel-holder]');
    const ribbonMenu = document.querySelector('[data-ribbon-holder]');
    const stepSlider = document.querySelector('[data-slider-holder]');
    const cartIcon = document.querySelector('[data-cart-icon-holder]');
    const productsGrid = document.querySelector('[data-products-grid-holder]');

    carousel.append(this.carousel.elem);
    ribbonMenu.append(this.ribbonMenu.elem);
    stepSlider.append(this.stepSlider.elem);
    cartIcon.append(this.cartIcon.elem);

    const responsePromise = fetch('http://127.0.0.1:5500/9-module/2-task/products.json');
    
    await responsePromise
      .then((response) => {
        response.json()
          .then(json => {
            const product = new ProductsGrid(json);
            const noNutsCheck = document.querySelector('#nuts-checkbox');
            const veganCheck = document.querySelector('#vegeterian-checkbox');

            document.body.addEventListener('product-add', (event) => {
              for (let item of product.products) {
                if (item.id == event.detail) {
                  this.cart.addProduct(item);
                }
              }
            });

            console.log(this.stepSlider);

            this.stepSlider.elem.addEventListener('slider-change', (event) => {
              product.updateFilter({
                maxSpiciness: event.detail
              });
            });

            this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
              product.updateFilter({
                category: event.detail
              });
            });

            noNutsCheck.addEventListener('change', (event) => {

              if (noNutsCheck.checked) {
                product.updateFilter({
                  noNuts: true
                });    
              } else {
                product.updateFilter({
                  noNuts: false
                });                 
              }
          
            });

            veganCheck.addEventListener('change', (event) => {

              if (veganCheck.checked) {
                product.updateFilter({
                  vegeterianOnly: true
                });    
              } else {
                product.updateFilter({
                  vegeterianOnly: false
                });                 
              }
          
            });
            
            productsGrid.append(product.elem);

          });
      })
      .catch(() => {
        console.log('error');
      });
  }
}
