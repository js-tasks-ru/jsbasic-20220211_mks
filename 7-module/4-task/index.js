import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  steps = null;
  value = null;
  elem = null;

  constructor({ steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    const result = this.template();    
    const thumb = result.querySelector('.slider__thumb');
    const slider = document.querySelector('.slider');
    const progress = result.querySelector('.slider__progress');
    thumb.style.left = `${100/(this.steps - 1) * this.value}%`;
    progress.style.width = `${100/(this.steps - 1) * this.value}%`;
    result.querySelector('.slider__value').innerText = this.value;
    result.querySelector(`.slider__steps span:nth-child(${this.value + 1})`).classList.add('slider__step-active');

    console.log(result.getBoundingClientRect());
    thumb.ondragstart = () => {
      return false;
    };
    
    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();

      const onMove = (event) => {
    
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        let leftPercents = leftRelative * 100;

        result.classList.add('slider_dragging');

        if (leftRelative < 0) {
          leftRelative = 0;
          value = 0;
          leftPercents = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
          value = this.steps - 1;
          leftPercents = 100;
        }

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        result.querySelector('.slider__value').innerText = value;

        for (let i = 1; i <= this.steps; i++) {
          result.querySelector(`.slider__steps span:nth-child(${i})`).classList.remove('slider__step-active');
        }
        result.querySelector(`.slider__steps span:nth-child(${value + 1})`).classList.add('slider__step-active');

      }

      document.addEventListener('pointerup', (event) => {
        result.classList.remove('slider_dragging');
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        let valuePercents = value / segments * 100;

        if (value < 0) {
          value = 0;
        }

        if (value > this.steps) {
          value = this.steps - 1;
        }

        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;        
        
        const sliderChangeEvent = new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        });
        this.elem.dispatchEvent(sliderChangeEvent);

        document.removeEventListener('pointermove', onMove);        
      }, {once: true});

      document.addEventListener('pointermove', onMove);
     });



    result.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      result.querySelector('.slider__value').innerText = value;

      for (let i = 1; i <= this.steps; i++) {
        result.querySelector(`.slider__steps span:nth-child(${i})`).classList.remove('slider__step-active');
      }
      result.querySelector(`.slider__steps span:nth-child(${value + 1})`).classList.add('slider__step-active');

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      
      const sliderChangeEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChangeEvent);
    });

    return result;
  }

  containerSlider() {
    return createElement(`<div class="slider"></div>`);
  }

  thumbSlider() {
    return createElement(`
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
    `);
  }

  progressSlider() {
    return createElement(`
      <div class="slider__progress"></div>
    `);
  }

  stepsSlider() {
    const slidersteps = createElement(`
      <div class="slider__steps"></div>
    `);

    for (let i = 0; i < this.steps; i++) {
      const onestep = createElement(`
        <span></span>
      `);

      slidersteps.append(onestep);
    }

    return slidersteps;
  }

  template() {
    const container = this.containerSlider();
    const thumb = this.thumbSlider();
    const progress = this.progressSlider();
    const steps = this.stepsSlider();

    container.append(thumb, progress, steps);

    return container;
  }
}
