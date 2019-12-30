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

    this.errorsClass =
        (options && options.errorsClass) || 'formSlider-error';

    this.currentSlideIndex = 0;

    this.init();
  }

  /**
   * Init the form
   */
  init() {

    // Hide all slides except the first one
    this.formSlides.forEach(element => {
      this.hideSlide(element);
    });
    this.showSlide(this.formSlides[this.currentSlideIndex]);

    // Update the nav status
    this.updateNav();

    /**
     * Add event listener on prevSlide link click
     */
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

    /**
     * Add event listener on nextSlide link click
     */
    this.nextSlide.addEventListener('click', e => {

      const currentSlide = this.formSlides[this.currentSlideIndex];

      console.log(this.slideValid(currentSlide).errors);

      // If this is the last slide
      if (this.currentSlideIndex >= this.formSlides.length - 1 ) {
        e.preventDefault();
      } else if (this.slideValid(currentSlide).errors.length > 0) {
        e.preventDefault();
        this.showError(this.slideValid(currentSlide).errors);
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

  slideValid(slide) {
    let areValid = {
      errors: []
    };

    const inputs = slide.querySelectorAll('input');
    const textareas = slide.querySelectorAll('textarea');

    if(inputs) {
      inputs.forEach(element => {
        if(element.value === '') {
          areValid.errors.push(element.name);
        }
      });
    }

    if(textareas) {
      textareas.forEach(element => {
        if(element.value === '') {
          areValid.errors.push(element.name);
        }
      });
    }

    return areValid;
  }

  /**
   * Errors
   * @param {Array} errors - The errors
   */
  showError(errors) {

    const $errors = document.querySelector(this.errorsClass);

    if(!$errors) {

      // Create the error div container + add a given class
      const errorsContainer = document.createElement('div');
      errorsContainer.classList.add(this.errorsClass);

      // Create a list container
      const errorsList = document.createElement('ul');

      // Foreach error create a List item
      errors.forEach(error => {
        const errorsLi = document.createElement('li');
        errorsLi.innerText = error + " is required. Please answer the question.";

        errorsList.appendChild(errorsLi);
      });

      errorsContainer.appendChild(errorsList);

      document.querySelector('body').prepend(errorsContainer);

      // Remove the errors container after 2 seconds
      setTimeout(() => {
        errorsContainer.remove();
      },2000);
    }


  }
}
