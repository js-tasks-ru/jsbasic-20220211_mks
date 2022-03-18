import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = [];

  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render() {
 
    const slider = this.template();
    const img = slider.querySelector('.carousel__img');
    let slideWidth = 0;  

    img.onload = function() {
      slideWidth = img.width;
    }

    let sliderCalc = 0;
    
    slider.querySelector('.carousel__arrow_left').style.display = 'none';
    
    slider.querySelector('.carousel__arrow_right').addEventListener('click', () => {

      slider.querySelector('.carousel__arrow_left').style.display = 'flex';
    
      sliderCalc = sliderCalc - slideWidth;
    
      slider.querySelector('.carousel__inner').style.transform = `translateX(${sliderCalc}px)`;
    
      if (sliderCalc == ((1 - this.oneslide().childElementCount) * slideWidth)) {
        slider.querySelector('.carousel__arrow_right').style.display = 'none';
      }
    
    });
    
    slider.querySelector('.carousel__arrow_left').addEventListener('click', () => {
      slider.querySelector('.carousel__arrow_right').style.display = 'flex';
    
      sliderCalc = sliderCalc + slideWidth;
      slider.querySelector('.carousel__inner').style.transform = `translateX(${sliderCalc}px)`;
    
      if (sliderCalc == 0) {
        slider.querySelector('.carousel__arrow_left').style.display = 'none';
      }
    
    });

    return slider;
  }

  container() {
    return createElement(`
      <div class="carousel"></div>
    `);
  }

  oneslide() {
    const carouselInner = createElement(`
      <div class="carousel__inner"></div>
    `);
  
    for (this.slide of this.slides) {
      const idSlide = this.slide.id;

      const oneSlide = createElement(`
        <div class="carousel__slide" data-id="${this.slide.id}">
          <img src="/assets/images/carousel/${this.slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slide.price.toFixed(2)}</span>
            <div class="carousel__title">${this.slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>      
    `);

      oneSlide.querySelector('.carousel__button').addEventListener('click', () => {
        const event = new CustomEvent('product-add', {
          detail: idSlide,
          bubbles: true
        });
        
        this.elem.dispatchEvent(event);
      });

      carouselInner.append(oneSlide);
    }

    return carouselInner;
  }

  slidernavsright() {
    return createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>    
    `);
  }

  slidernavsleft() {
    return createElement(`
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
  `);
  }

  template() {   

    const container = this.container();
    const oneslide = this.oneslide();
    const navright = this.slidernavsright();
    const navleft = this.slidernavsleft();
 
    container.append(navright);
    container.append(navleft);
    container.append(oneslide);
 
    return container;
  }

}
