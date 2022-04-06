import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.allProductCards();
  }

  container() {
    return createElement(`
      <div class="products-grid"></div>      
    `);
  }

  inner() {
    return createElement(`
      <div class="products-grid__inner"></div>    
    `);    
  }

  allProductCards() {
    const container = this.container();
    const inner = this.inner();

    for (let product of this.products) {
      inner.append(new ProductCard(product).elem);
    }

    container.append(inner);

    return container;
  }

  updateFilter = (filters) => {
    const inner = this.inner();
    const cards = [];
    const filteredCards = [];

    this.filters = Object.assign(this.filters, filters);

    for (let item of this.products) {

      if (item.nuts && this.filters.noNuts) {continue;}

      if (!item.vegeterian && this.filters.vegeterianOnly) {continue;}

      if (item.spiciness > this.filters.maxSpiciness && this.filters.maxSpiciness) {continue;}
    
      if (this.filters.category && this.filters.category !== item.category) {continue;}

      filteredCards.push(item);      
    }

    cardsView(filteredCards);

    function cardsView(cardsForView) {
      for (let item of cardsForView) {
        cards.push(new ProductCard(item));
      }
    }

    for (let card of cards) {
      inner.append(card.elem);
    }

    this.elem.innerHTML = '';
    this.elem.append(inner);
  }

}