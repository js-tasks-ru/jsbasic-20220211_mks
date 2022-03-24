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

    menu.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    
    menu.querySelector('.ribbon__arrow_right').addEventListener('click', () => {
      const innerMenu = menu.querySelector('.ribbon__inner');
      let scrollWidth = innerMenu.scrollWidth;
      let scrollLeft = innerMenu.scrollLeft;
      let clientWidth = innerMenu.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth - 350;

      innerMenu.scrollBy(350, 0);
      
      innerMenu.addEventListener('scroll', () => {
        menu.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
        if (scrollRight < 1) {
          menu.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
        }
      });


    });

    menu.querySelector('.ribbon__arrow_left').addEventListener('click', () => {
      const innerMenu = menu.querySelector('.ribbon__inner');
      let scrollLeft = innerMenu.scrollLeft - 350;
      innerMenu.scrollBy(-350, 0);
      

      innerMenu.addEventListener('scroll', () => {
        menu.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
        if(scrollLeft <= 1) {
          menu.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
        }
      });
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
    `)
    let selectedItemMenu;
    

    for (this.category of this.categories) {
      const idItemMenu = this.category.id;
      const itemMenu = createElement(`
        <a href="#" class="ribbon__item" data-id="${this.category.id}">${this.category.name}</a>
      `);

      innerMenu.addEventListener('click', () => {
        let target = event.target;
        
        if (target.tagName != 'A') return;
  
        highlight(target);
      });

      itemMenu.addEventListener('click', () => {
        const event = new CustomEvent('ribbon-select', {
          detail: idItemMenu,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
      });
      
      
  
      function highlight(td) {
        if (selectedItemMenu) {
          selectedItemMenu.classList.remove('ribbon__item_active');
        }
        selectedItemMenu = td;
        selectedItemMenu.classList.add('ribbon__item_active');
      }

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
