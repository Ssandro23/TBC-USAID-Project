// Elements
const navigationMenuWrappers = document.querySelectorAll('.nav-menu .pointer');

const hiddenDropdownLists = document.querySelectorAll('.hidden-dropdown-list');

const activeLanguages = document.querySelectorAll('.avtive-language');
const nonActiveLanguages = document.querySelectorAll('.non-active-language');

const dropdownMenuElementsUL = document.querySelectorAll('.dropdown-menu-element ul');

const firstToolsDropdownLine = document.querySelector('.tools-dropdown-line-1');
const secondToolsDropdownLine = document.querySelector('.tools-dropdown-line-2');
const thirdToolsDropdownLine = document.querySelector('.tools-dropdown-line-3');
const cardKitContainers = document.querySelectorAll('.kit-container');

const georgianContent = document.querySelectorAll('.geo');
const englishContent = document.querySelectorAll('.eng');

const carouselItems = document.querySelectorAll('.offers-carousel-item');
const infoContainer = document.querySelector('.info-menu-wrapper');
const infoButtons = document.querySelector('.info-buttons');

const logosOfCompany = document.querySelectorAll('[id="logo-desktop"]');
const dropdownOfTools = document.querySelector('.tools-dropdown');
const toolsDropdownMenu = document.querySelector('.tools-dropdown-menu');

const mainElement = document.querySelector('main');
const dropdownMenuElements = document.querySelectorAll('.dropdown-menu-element');
const ulArrowsElements = document.querySelectorAll('.fa-angle-down');

const numbersOfImagesArray = [6, 3, 4];

const anchors = document.querySelectorAll('a');
const arrowsSvg = document.querySelectorAll('.arrow-container svg');
const sliders = document.querySelectorAll('.slider');

const sliderContainers = document.querySelectorAll('.slider-cont');
const elementUnderlines = document.querySelectorAll('.underline');
const hiddenMenuContent = document.querySelector('.hidden-menu-container');

const thumbs = document.querySelectorAll('.scrollbar-thumb');
const tracks = document.querySelectorAll('.scrollbar-track');

function hideActive() {
  elementUnderlines.forEach((underline) => (underline.style.transform = 'scaleX(0)'));
  hiddenMenuContent.style.opacity = '0';
  hiddenMenuContent.style.pointerEvents = 'none';
  hiddenDropdownLists.forEach((dropdown) => {
    dropdown.style.opacity = '0';
    dropdown.style.pointerEvents = 'none';
  });
}

function unsetDropdowns() {
  firstToolsDropdownLine.style.transform = 'translateZ(0) scaleX(1) rotate(0deg)';
  firstToolsDropdownLine.style.width = '11px';
  secondToolsDropdownLine.style.opacity = '1';
  thirdToolsDropdownLine.style.transform = 'scaleX(1) rotate(0deg)';
  thirdToolsDropdownLine.style.width = '15px';
  toolsDropdownMenu.classList.remove('active');
  mainElement.style.display = 'unset';
  dropdownMenuElementsUL.forEach((ul) => (ul.style.maxHeight = '0'));
  ulArrowsElements.forEach((arrow) => (arrow.style.transform = 'rotate(0)'));
}

function initializeToolsDropdownLine() {
  if (firstToolsDropdownLine) {
    firstToolsDropdownLine.style.transform = 'translateZ(0) scaleX(1) rotate(0deg)';
  }
}

// Remove focus from the element
anchors.forEach((link) => {
  link.addEventListener('pointerleave', () => {
    link.blur();
    document.querySelectorAll('.hero').forEach((hero) => {
      hero.querySelector('button').blur();
    });
  });
});

// Language Change Functions
function changeLanguage(fromLang, toLang) {
  const links = document.getElementsByTagName('a');
  for (let link of links) {
    const href = link.getAttribute('href');
    if (href && href.startsWith(`https://tbcconcept.ge/${fromLang}/`)) {
      const newHref = href.replace(
        `https://tbcconcept.ge/${fromLang}/`,
        `https://tbcconcept.ge/${toLang}/`
      );
      link.setAttribute('href', newHref);
    }
  }
}

function changeLanguageToEnglish() {
  changeLanguage('ge', 'en');
}

function changeLanguageToGeorgian() {
  changeLanguage('en', 'ge');
}

// Event Listeners

// Initialization
document.addEventListener('DOMContentLoaded', function () {
  initializeToolsDropdownLine();
  initializeCookieConsent();
});

//cookies
function initializeCookieConsent() {
  const consentBanner = document.querySelector('.cookies-banner-wrapper');
  const acceptButton = document.querySelector('.accept-cookies');

  const hasUserConsented = () => localStorage.getItem('cookieConsent') === 'true';

  const showConsentBanner = () => {
    if (consentBanner) {
      consentBanner.style.display = 'flex';
    }
  };

  const hideConsentBanner = () => {
    if (consentBanner) {
      consentBanner.style.display = 'none';
    }
  };

  const handleAcceptConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    hideConsentBanner();
  };

  const handlePointerLeave = () => {
    acceptButton.blur();
  };

  if (!hasUserConsented()) {
    showConsentBanner();
  } else {
    hideConsentBanner();
  }

  if (acceptButton) {
    acceptButton.addEventListener('click', handleAcceptConsent);
    acceptButton.addEventListener('pointerleave', handlePointerLeave);
  }
}

// Global click handler to hide menu
document.addEventListener('click', hideActive);

// Responsive design handler
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    unsetDropdowns();
  }
});

// Logo click functionality
logosOfCompany.forEach((logo) => {
  logo.addEventListener('click', () => {
    window.location.href = window.location.href;
  });
});

// Navigation menu functionality
navigationMenuWrappers.forEach((paragraph, index) => {
  paragraph.addEventListener('click', (event) => {
    event.stopPropagation();
    const isActive = elementUnderlines[index].style.transform === 'scaleX(1)';
    hideActive();
    if (!isActive) {
      elementUnderlines[index].style.transform = 'scaleX(1)';
      setTimeout(() => {
        hiddenMenuContent.style.opacity = '1';
        hiddenMenuContent.style.pointerEvents = 'auto';
      }, 300);
      setTimeout(() => {
        hiddenDropdownLists[index].style.opacity = '1';
        hiddenDropdownLists[index].style.pointerEvents = 'auto';
      }, 500);
    }
  });
});

// Language switch functionality
function switchLanguage() {
  const currentLang = activeLanguages[0].innerText;
  const newActiveLang = currentLang === 'ქარ' ? 'ENG' : 'ქარ';
  const newNonActiveLang = currentLang === 'ქარ' ? 'ქარ' : 'ENG';

  activeLanguages.forEach((lang) => (lang.innerText = newActiveLang));
  nonActiveLanguages.forEach((lang) => (lang.innerText = newNonActiveLang));

  if (currentLang === 'ქარ') {
    georgianContent.forEach((element) => element.classList.remove('active'));
    englishContent.forEach((element) => element.classList.add('active'));
    changeLanguageToEnglish();
  } else {
    englishContent.forEach((element) => element.classList.remove('active'));
    georgianContent.forEach((element) => element.classList.add('active'));
    changeLanguageToGeorgian();
  }
}

// Add click event listeners to all language elements
activeLanguages.forEach((lang) => lang.addEventListener('click', switchLanguage));
nonActiveLanguages.forEach((lang) =>
  lang.addEventListener('click', switchLanguage)
);

// Tools dropdown functionality
dropdownOfTools.addEventListener('click', () => {
  if (firstToolsDropdownLine.style.width === '20px') {
    unsetDropdowns();
  } else {
    firstToolsDropdownLine.style.transform = 'scaleX(1) rotate(-45deg)';
    firstToolsDropdownLine.style.width = '20px';
    secondToolsDropdownLine.style.opacity = '0';
    thirdToolsDropdownLine.style.transform = 'scaleX(1)  rotate(45deg)';
    thirdToolsDropdownLine.style.width = '20px';
    toolsDropdownMenu.classList.add('active');
    mainElement.style.display = 'none';
  }
});

// Dropdown menu elements functionality
dropdownMenuElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    const isExpanded =
      dropdownMenuElementsUL[index].style.maxHeight === '14rem';
    dropdownMenuElementsUL.forEach((ul) => {
      ul.style.maxHeight = '0';
      ul.style.paddingTop = '0';
    });
    ulArrowsElements.forEach((arrow) => (arrow.style.transform = 'rotate(0)'));
    if (!isExpanded) {
      dropdownMenuElementsUL[index].style.maxHeight = '14rem';
      dropdownMenuElementsUL[index].style.paddingTop = '2rem';
      ulArrowsElements[index].style.transform = 'rotate(180deg)';
    }
  });
});

// Kit containers click functionality
cardKitContainers.forEach((kit) => {
  kit.addEventListener('click', () => {
    const lang = activeLanguages[0].innerText === 'ქარ' ? 'ge' : 'en';
    let url;
    if (kit.classList.contains('1')) {
      url = `https://tbcconcept.ge/${lang}/singleview/245-digital-kit`;
    } else if (kit.classList.contains('2')) {
      url = `https://tbcconcept.ge/${lang}/singleview/3300-premium-kit`;
    } else {
      url = `https://tbcconcept.ge/${lang}/singleview/3301-concept-360`;
    }
    window.location.href = url;
  });
});
class Slider {
  constructor(slider, sliderCont, thumb, track, carouselItem, numOfImages, arrowSvgs) {
    this.slider = slider;
    this.sliderCont = sliderCont;
    this.thumb = thumb;
    this.track = track;
    this.carouselItem = carouselItem;
    this.numOfImages = numOfImages;
    this.arrowSvgs = arrowSvgs;
    this.currentStep = 0;
    this.isDragging = false;
    this.startX = 0;
    this.thumbStartX = 0;
    this.sliderStartX = 0;
    this.speed = 0.7;
    this.movedLeft = false;
    this.movedRight = false;
    this.totalSteps = this.calculateTotalSteps();

    this.setThumbWidth();
    this.initEvents();

    window.addEventListener('resize', this.debounce(() => this.reinitialize(), 250));
  }

  calculateTotalSteps() {
    return this.numOfImages - Math.floor(this.slider.clientWidth / this.carouselItem.clientWidth) + 1;
  }

  setThumbWidth() {
    const thumbWidth = this.track.clientWidth / this.totalSteps - 1;
    this.thumb.style.width = `${thumbWidth}px`;
  }

  reinitialize() {
    this.totalSteps = this.calculateTotalSteps();
    this.currentStep = 0;
    this.resetTransforms();
    this.setThumbWidth();
    this.adjustSlider();
    this.adjustThumb();
  }

  resetTransforms() {
    this.thumb.style.transform = 'translateX(0)';
    this.slider.style.transform = 'translateX(0)';
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  initEvents() {
    const startDragging = (e) => this.draggingStart(e);
    const continueDragging = (e) => this.isDragging && this.slide(e);
    const stopDragging = () => this.isDragging && this.endDragging();

    this.addDragEvents(this.sliderCont, startDragging);
    this.addDragEvents(this.slider, startDragging);
    this.addDragEvents(this.thumb, startDragging);
    this.addDragEvents(this.track, startDragging);

    document.addEventListener('mousemove', continueDragging);
    document.addEventListener('touchmove', (e) => continueDragging(e.touches[0]), { passive: true });

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    this.arrowSvgs.forEach((svg, index) => svg.addEventListener('click', () => this.handleArrowClick(index)));
  }

  addDragEvents(element, startEvent) {
    element.addEventListener('mousedown', startEvent);
    element.addEventListener('touchstart', (e) => startEvent(e.touches[0]), { passive: true });
  }

  handleArrowClick(index) {
    const isLeftArrow = index % 2 === 0;
    const isRightArrow = index % 2 === 1;

    this.updateArrowColors(index, isLeftArrow);

    if (isRightArrow && this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    } else if (isLeftArrow && this.currentStep > 0) {
      this.currentStep--;
    }

    this.updateThumbAndSliderPosition();
  }

  updateArrowColors(index, isLeftArrow) {
    if (this.arrowSvgs) {
      this.arrowSvgs[index].style.color = '#747C7F';
      this.arrowSvgs[isLeftArrow ? index + 1 : index - 1].style.color = '#182cc0';
    }
  }

  updateThumbAndSliderPosition() {
    const newPosition = (this.currentStep / this.totalSteps) * this.track.clientWidth;
    this.thumb.style.transform = `translateX(${newPosition}px)`;

    const itemWidth = this.carouselItem.getBoundingClientRect().width;
    if (this.currentStep === this.totalSteps - 1) {
      this.slider.style.transform = `translateX(${-this.slider.scrollWidth + this.slider.clientWidth}px)`;
    } else {
      this.slider.style.transform = `translateX(${(-itemWidth - 30) * this.currentStep}px)`;
    }
  }

  draggingStart(e) {
    this.isDragging = true;
    this.setTransitionDuration('0s');
    this.setCursorStyle('grabbing');

    this.startX = e.clientX;
    this.thumbStartX = this.getTranslateX(this.thumb);
    this.sliderStartX = this.getTranslateX(this.slider);
  }

  endDragging() {
    this.isDragging = false;
    this.adjustThumb();
    this.adjustSlider();
    this.setCursorStyle('grab');
    this.resetMoveFlags();
  }

  slide(e) {
    const trackRect = this.track.getBoundingClientRect();
    const mouseChangeX = (this.startX - e.clientX) * this.speed;
    let newThumbX = this.thumbStartX + mouseChangeX;

    newThumbX = Math.max(
      this.thumb.offsetWidth * -0.7,
      Math.min(newThumbX, trackRect.width - this.thumb.offsetWidth * 0.3)
    );

    this.thumb.style.transform = `translateX(${newThumbX}px)`;

    this.updateMoveFlags(newThumbX);

    const sliderWidth = this.slider.scrollWidth - this.slider.clientWidth;
    const sliderMoveRatio = sliderWidth / trackRect.width;
    const thumbMove = newThumbX - this.thumbStartX;
    const newSliderX = this.sliderStartX - thumbMove * sliderMoveRatio;
    this.slider.style.transform = `translateX(${newSliderX}px)`;
  }

  updateMoveFlags(newThumbX) {
    if (newThumbX > this.thumbStartX) {
      this.movedRight = true;
    } else if (newThumbX < this.thumbStartX) {
      this.movedLeft = true;
    }
  }

  adjustThumb() {
    const thumbStartX = this.getTranslateX(this.thumb);
    const trackWidth = this.track.clientWidth;
    const stepWidth = trackWidth / this.totalSteps;

    if (this.movedLeft && this.currentStep !== 0) {
      this.currentStep = Math.max(
        0,
        Math.min(Math.floor(thumbStartX / stepWidth), this.totalSteps - 1)
      );
    } else if (this.movedRight && this.currentStep < this.totalSteps - 1) {
      this.currentStep = Math.max(
        0,
        Math.min(Math.ceil(thumbStartX / stepWidth), this.totalSteps - 1)
      );
    }

    this.updateThumbAndSliderPosition();
    this.thumb.style.transition = '1s';
  }

  adjustSlider() {
    const itemWidth = this.carouselItem.getBoundingClientRect().width;
    if (this.currentStep === this.totalSteps - 1) {
      this.slider.style.transform = `translateX(${-this.slider.scrollWidth + this.slider.clientWidth}px)`;
    } else {
      this.slider.style.transform = `translateX(${(-itemWidth - 30) * this.currentStep}px)`;
    }
    this.slider.style.transition = '1s';
  }

  getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;
  }

  setTransitionDuration(duration) {
    this.thumb.style.transition = duration;
    this.slider.style.transition = duration;
  }

  setCursorStyle(style) {
    this.sliderCont.style.cursor = style;
    this.thumb.style.cursor = style;
    this.track.style.cursor = style;
  }

  resetMoveFlags() {
    this.movedLeft = false;
    this.movedRight = false;
  }
}


sliders.forEach((slider, index) => {
  new Slider(
    slider,
    sliderContainers[index],
    thumbs[index],
    tracks[index],
    carouselItems[index],
    numbersOfImagesArray[index],
    arrowsSvg
  );
});

// digital bank link
document.querySelector('.low').addEventListener('click', function () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS device
    window.location.href = 'https://apps.apple.com/us/app/tbc-bank/id766598432';
  } else {
    // Assume Android or other device
    window.location.href =
      'https://play.google.com/store/apps/details?id=com.icomvision.bsc.tbc&hl=en';
  }
});

//info-menu
let isVisible = false;
const dots = document.querySelector('.dots');
const xMark = document.querySelector('.x-mark');
infoContainer.addEventListener('click', () => {
  if (!isVisible) {
    infoButtons.style.visibility = 'visible';
    infoButtons.style.opacity = '1';
    infoButtons.style.maxHeight = 'fit-content';
    dots.style.maxHeight = '0';
    dots.style.maxWidth = '0';
    dots.style.opacity = '0';
    dots.style.visibility = 'hidden';
    xMark.style.maxHeight = 'fit-content';
    xMark.style.maxWidth = 'fit-content';
    xMark.style.opacity = '1';
    xMark.style.visibility = 'visible';
    infoButtons.style.overflow = 'visible';
  } else {
    infoButtons.style.overflow = 'hidden';

    infoButtons.style.opacity = '0';
    infoButtons.style.visibility = 'hidden';
    infoButtons.style.maxHeight = '0';
    xMark.style.maxHeight = '0';
    xMark.style.maxWidth = '0';
    xMark.style.opacity = '0';
    xMark.style.visibility = 'hidden';
    dots.style.maxHeight = 'fit-content';
    dots.style.maxWidth = 'fit-content';
    dots.style.opacity = '1';
    dots.style.visibility = 'visible';
  }
  isVisible = !isVisible;
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollableElements = document.querySelectorAll('*');

  let isScrolling;

  scrollableElements.forEach((element) => {
    if (
      getComputedStyle(element).overflowY === 'auto' ||
      getComputedStyle(element).overflowY === 'scroll'
    ) {
      element.addEventListener('scroll', function () {
        element.classList.add('scrolling');

        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function () {
          element.classList.remove('scrolling');
        }, 1000); // Adjust time as needed
      });
    }
  });
});

//form

const inputConts = document.querySelectorAll('.input-container');
const labels = document.querySelectorAll('.input-container label');
const inputs = document.querySelectorAll('.input-container .input-element');
const errors = document.querySelectorAll('.error');
const form = document.getElementById('userForm');
const textArea = document.querySelector('textarea');
const charcount = document.querySelector('.char-count');
const checkbox = document.getElementById('permission');
const xMarkCont = document.querySelector('.x-mark-cont');
const formLink = document.querySelector('.form-link');

function validateName(input) {
  return input.value.trim() !== '';
}

function validateNumber(input) {
  if (input.value.trim() === '') return false;
  return input.value.length >= 9 && !isNaN(input.value);
}

function validateEmail(input) {
  if (input.value.trim() === '') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input.value);
}

function validateTextArea(input) {
  return input.value.trim() !== '';
}

function validate(input) {
  switch (input.type) {
    case 'text':
      if (input.name === 'company') return true; // No validation for company
      return validateName(input);
    case 'tel':
      return validateNumber(input);
    case 'email':
      return validateEmail(input);
    case 'textarea':
      return validateTextArea(input);
    default:
      return true;
  }
}

function getErrorMessage(input, currentLang) {
  const isGeorgian = activeLanguages[0].innerText === 'ქარ';
  const messages = {
    required: isGeorgian ? 'აუცილებელი ველი' : 'This field is required',
    tel: isGeorgian
      ? 'ნომერი მინიმუმ 9 ციფრს უნდა შეიცავდეს'
      : 'The number must be at least 9 digits',
    email: isGeorgian
      ? 'გთხოვთ მიუთითოთ რეალური მეილი'
      : 'Please enter a valid email address',
  };

  if (input.value.trim() === '') {
    return messages.required;
  }
  switch (input.type) {
    case 'tel':
      return messages.tel;
    case 'email':
      return messages.email;
    default:
      return messages.required;
  }
}

inputConts.forEach((inputCont, index) => {
  inputCont.addEventListener('click', () => {
    labels[index].style.fontSize = '1rem';
    labels[index].style.top = '5px';
    inputs[index].style.borderColor = '#308fc6';
  });

  inputs[index].addEventListener('blur', () => {
    if (inputs[index].value === '') {
      labels[index].style.fontSize = '';
      labels[index].style.top = '';
    }

    if (validate(inputs[index])) {
      inputs[index].style.borderColor = '';
      errors[index].style.display = 'none';
    } else {
      inputs[index].style.borderColor = '#da1a1c';
      errors[index].textContent = getErrorMessage(inputs[index]);
      errors[index].style.display = 'block';
    }
  });
});

// Add this function to sanitize inputs
function sanitizeInput(input) {
  if (input.type === 'tel') {
    input.value = input.value.replace(/[^0-9]/g, '');
  } else if (input.name === 'firstName') {
    input.value = input.value.replace(/[^A-Za-z ]/g, '');
  }
}
// Add event listeners for input sanitization
inputs.forEach((input) => {
  input.addEventListener('input', function () {
    sanitizeInput(this);
    updateSubmitButton();
  });
});

// charcount

textArea.addEventListener('input', () => {
  charcount.innerText = `${textArea.value.length}/100`;
});

const submitButton = form.querySelector('button[type="submit"]');

function validateForm() {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.required && !validate(input)) {
      isValid = false;
    }
  });

  if (!checkbox.checked) {
    isValid = false;
  }

  return isValid;
}

function updateSubmitButton() {
  if (validateForm()) {
    submitButton.classList.add('activeBtn');
  } else {
    submitButton.classList.remove('activeBtn');
  }
}

checkbox.addEventListener('change', updateSubmitButton);
// Prevent form submission if validation fails
form.addEventListener('submit', function (e) {
  if (!validateForm()) {
    e.preventDefault();
  }
});
// form opening/closure
formLink.addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'flex';
});
xMarkCont.addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'none';
});
