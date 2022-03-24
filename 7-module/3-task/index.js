import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  steps = null;
  value = null;
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    const result = this.template();    
    const thumb = result.querySelector('.slider__thumb');
    const progress = result.querySelector('.slider__progress');
    progress.style.width = '0%';
    result.querySelector('.slider__value').innerText = 0;
    result.querySelector(`.slider__steps span:nth-child(1)`).classList.add('slider__step-active');

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
