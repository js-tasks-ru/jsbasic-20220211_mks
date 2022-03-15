function initCarousel() {
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  const slider = document.querySelector('.carousel__inner');
  const slide = slider.querySelector('.carousel__slide');

  const slideWidth = slide.offsetWidth;

  sliderCalc = 0;
  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', () => {
    arrowLeft.style.display = 'flex';

    sliderCalc = sliderCalc - slideWidth;
    slider.style.transform = `translateX(${sliderCalc}px)`;

    if (sliderCalc == ((1 - slider.childElementCount) * slideWidth)) {
      arrowRight.style.display = 'none';
    }

  });

  arrowLeft.addEventListener('click', () => {
    arrowRight.style.display = 'flex';

    sliderCalc = sliderCalc + slideWidth;
    slider.style.transform = `translateX(${sliderCalc}px)`;

    if (sliderCalc == 0) {
      arrowLeft.style.display = 'none';
    }

  });

  

}
