# FormSlider.js

Transform a basic form into a form slider


## Installation 

```bash
npm install
```

## Usage

First import the FormSlider class into your javascript file
```javascript
import FormSlider from './FormSlider';
```

Instantiate the class with 
```javascript
new FormSlider();
```

You can pass an options object as parameter when you instantiate FromSlider(). 
```javascript
new FormSlider(options);
```
He are the default options.
```javascript
const options = {
    /**
     * @param {NodeListOf<HTMLElement>} The nodelist of slide containers
    */
    formSlides: document.querySelectorAll('.formSlider-item'),

    /**
     * @param {HTMLElement} The previous Link 
    */
    prevSlide: document.querySelector('.formSlider-prev'),
    
    /**
     * @param {HTMLElement} The next Link 
    */
    nextSlide: document.querySelector('.formSlider-next'),
    
    /**
     * @param {string} The css class that shows the slide 
    */
    showSlideClass: 'formSlider-show-item',
    
    /**
     * @param {string} The css class that hides the slide 
    */
    hideSlideClass: 'formSlider-hide-item',

    /**
     * @param {string} The css class that disable the nav links 
    */
    disableNavClass: 'formSlider-disable-arrow',

    /**
     * @param {string} The css class that disable the nav links 
    */
    errorsClass: 'formSlider-error',
}
```

The default HTML structure looks like

```html
    <form action="" class="formSlider">
      <a href="#" class="formSlider-arrow formSlider-prev">&leftarrow;</a>
      <div class="formSlider-item">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <div class="formSlider-item">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>

      <div class="formSlider-item">
        <label for="address">Address</label>
        <input type="text" name="address" id="address" />
      </div>

      <div class="formSlider-item">
        <label for="message">Name</label>
        <textarea name="message" id="message"></textarea>
      </div>

      <a href="#" class="formSlider-arrow formSlider-next">&rightarrow;</a>
    </form>
```

## Development

Launch the ParcelJs dev web server with :
```bash
npm run dev
```

## Dependencies

- [Parcel.js](https://parceljs.org/)
- [Sass](https://sass-lang.com/)