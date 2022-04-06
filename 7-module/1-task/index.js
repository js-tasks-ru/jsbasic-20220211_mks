import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  categories = null;
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    const menu = this.template();
    const innerMenu = menu.querySelector('.ribbon__inner');

    menu.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    
    menu.querySelector('.ribbon__arrow_right').addEventListener('click', () => {
      innerMenu.scrollBy(350, 0);
    });

    menu.querySelector('.ribbon__arrow_left').addEventListener('click', () => {
      innerMenu.scrollBy(-350, 0);
    });

    innerMenu.addEventListener('scroll', () => {
      let scrollWidth = innerMenu.scrollWidth;
      let scrollLeft = innerMenu.scrollLeft;
      let clientWidth = innerMenu.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        menu.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      } else {
        menu.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        menu.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      } else {
        menu.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    });    

    return menu;
  }

  container() {
    return createElement(`
      <div class="ribbon"></div>
    `)
  }

  itemsMenu() {
    const innerMenu = createElement(`
      <div class="ribbon__inner"></div>
    `);
    
    for (this.category of this.categories) {
      const idItemMenu = this.category.id;
      const itemMenu = createElement(`
        <a href="#" class="ribbon__item" data-id="${this.category.id}">${this.category.name}</a>
      `);

      itemMenu.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName != 'A') return;

        e.preventDefault();

        const siblings = Array.prototype.slice.call(target.parentNode.children);
        const event = new CustomEvent('ribbon-select', {
          detail: idItemMenu,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
        
        for (var i = siblings.length; i--;) {
          if (siblings[i] == target) {
            target.classList.add('ribbon__item_active');
          } else {
            target.parentNode.children[i].classList.remove('ribbon__item_active');
          }
        }
      });
      
      innerMenu.append(itemMenu);
    }

    return innerMenu;
  }

  leftarrowMenu() {
    return createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
  }

  rightarrowMenu() {
    return createElement(`
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
  }

  template() {
    const container = this.container();
    const leftarrowMenu = this.leftarrowMenu();
    const itemsMenu = this.itemsMenu();
    const rightarrowMenu = this.rightarrowMenu();

    container.append(leftarrowMenu, itemsMenu, rightarrowMenu);

    return container;
  }
}
