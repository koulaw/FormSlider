/**
 * Transform a standard form in a slider
 */
export default class formSlider {
  constructor(options) {
    this.formSlides =
      (options && options.formSlides) ||
      document.querySelectorAll('.formSlider-item');

    this.prevSlide =
      (options && options.prevSlide) ||
      document.querySelector('.formSlider-prev');

    this.nextSlide =
      (options && options.nextSlide) ||
      document.querySelector('.formSlider-next');

    this.showSlideClass =
      (options && options.showSlideClass) || 'formSlider-show-item';

    this.hideSlideClass =
      (options && options.hideSlideClass) || 'formSlider-hide-item';

    this.disableNavClass =
      (options && options.disableNavClass) || 'formSlider-disable-arrow';

    this.currentSlideIndex = 0;

    this.init();
  }

  /**
   * Init the form
   */
  init() {
    this.formSlides.forEach(element => {
      this.hideSlide(element);
    });
    this.showSlide(this.formSlides[this.currentSlideIndex]);
    this.updateNav();

    // Add event listener on prevSlide click
    this.prevSlide.addEventListener('click', e => {

      const currentSlide = this.formSlides[this.currentSlideIndex];

      // If this is the first slide
      if (this.currentSlideIndex === 0) {
        e.preventDefault();
      } else {
        this.hideSlide(currentSlide);
        this.currentSlideIndex -= 1;
        this.updateNav();
        this.showSlide(this.formSlides[this.currentSlideIndex]);
      }
    });

    // Add event listener on nextSlide click
    this.nextSlide.addEventListener('click', e => {

      const currentSlide = this.formSlides[this.currentSlideIndex];

      // If this is the last slide
      if (this.currentSlideIndex >= this.formSlides.length - 1 ) {
        e.preventDefault();
      } else if (!this.isValid(currentSlide)) {
        e.preventDefault();
        console.error('Veuillez remplir les champs du formulaire');
      } else {
        this.hideSlide(currentSlide);
        this.currentSlideIndex += 1;
        this.updateNav();
        this.showSlide(this.formSlides[this.currentSlideIndex]);
      }
    });
  }

  /**
   * Hide a given element
   * @param {HTMLElement} element
   */
  hideSlide(element) {
    element.classList.remove(this.showSlideClass);
    element.classList.add(this.hideSlideClass);
  }

  /**
   * Show a given element
   * @param {HTMLElement} element
   */
  showSlide(element) {
    element.classList.remove(this.hideSlideClass);
    element.classList.add(this.showSlideClass);
  }

  /**
   * Handle Navs state
   */
  updateNav() {
    if (this.currentSlideIndex <= 0) {
      this.prevSlide.classList.add(this.disableNavClass);
    } else if (this.currentSlideIndex >= this.formSlides.length - 1) {
      this.nextSlide.classList.add(this.disableNavClass);
    } else {
      this.prevSlide.classList.remove(this.disableNavClass);
      this.nextSlide.classList.remove(this.disableNavClass);
    }
  }

  isValid(slide) {
    let areValid = true;
    const inputs = slide.querySelectorAll('input');
    const textareas = slide.querySelectorAll('textarea');

    if(inputs) {
      inputs.forEach(element => {
        if(element.value === '') {
          areValid = false;
        }
      });
    }

    if(textareas) {
      textareas.forEach(element => {
        if(element.value === '') {
          areValid = false;
        }
      });
    }

    return areValid;
  }


}
